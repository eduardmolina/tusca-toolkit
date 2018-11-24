import json

from flask import Blueprint, request


def parse_results(results, keys):
    return [{key: result[key_index]
            for key_index, key in enumerate(keys)} for result in results]


def make_db_query(db_con, query, keys):
    cursor = db_con.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    parsed_results = parse_results(results, keys)
    cursor.close()

    return parsed_results


def create_routes(db_con):
    bp = Blueprint('api_routes', __name__)

    @bp.route('/healthcheck', methods=['GET'])
    def healthcheck():
        return 'Alive', 200

    @bp.route('/search_events', methods=['GET'])
    def search_events():
        fields = ['name', 'place', 'date', 'price']
        query = 'select {} from events;'.format(','.join(fields))
        parsed_results = []
        try:
            parsed_results = make_db_query(db_con, query, fields)
            success = True
        except Exception:
            success = False
        db_con.commit()

        return json.dumps(
            {'data': parsed_results, 'success': success},
            ensure_ascii=False), 200

    @bp.route('/search_wards', methods=['GET'])
    def search_wards():
        fields = ['cpf', 'patient', 'nurse', 'companion', 'date', 'diagnostic']
        query = 'select {} from wards;'.format(','.join(fields))
        parsed_results = []
        try:
            parsed_results = make_db_query(db_con, query, fields)
            success = True
        except Exception:
            success = False
        db_con.commit()

        return json.dumps(
            {'data': parsed_results, 'success': success},
            ensure_ascii=False), 200

    @bp.route('/insert_wards', methods=['POST'])
    def insert_wards():
        data = json.loads(request.data.decode('utf-8'))
        query = 'insert into wards '\
                '(cpf, patient, nurse, companion, date, diagnostic) ' \
            "values ('{}', '{}', '{}', '{}', '{}', '{}');".format(
                data['cpf'], data['patient'], data['nurse'],
                data['companion'], data['date'], data['diagnostic'])
        try:
            cursor = db_con.cursor()
            cursor.execute(query)
            success = True
        except Exception as e:
            print(e)
            success = False
        db_con.commit()

        return json.dumps(
            {'data': '', 'success': success},
            ensure_ascii=False), 200

    @bp.route('/search_places', methods=['GET'])
    def search_places():
        fields = ['place_name']
        query = 'select {} from places;'.format(','.join(fields))
        parsed_results = []
        try:
            parsed_results = make_db_query(db_con, query, fields)
            success = True
        except Exception:
            success = False
        db_con.commit()

        return json.dumps(
            {'data': parsed_results, 'success': success},
            ensure_ascii=False), 200

    return bp
