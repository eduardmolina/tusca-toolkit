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
        fields = ['nome', 'local', 'data_hora', 'preco']
        query = 'select {} from evento;'.format(','.join(fields))
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
        fields = [
            'participante.cpf',
            'participante.nome',
            'enfermeiro.nome',
            'consulta.data_hora_entrada',
            'consulta.sintomas',
            'consulta.acompanhante']
        query = 'select {} from consulta ' \
            'join participante on participante.cpf = consulta.participante '\
            'join enfermeiro on enfermeiro.cofen = consulta.enfermeiro;'.format(','.join(fields))
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
        query = 'insert into consulta '\
                '(id_consulta, participante, enfermeiro, data_hora_entrada, sintomas, acompanhante) ' \
            "values ('{}', '{}', '{}', '{}', '{}', '{}');".format(
                data['id'], data['cpf'], data['nurse'], data['date'],
                data['diagnostic'], data['companion'])
        pgcode = ''

        try:
            cursor = db_con.cursor()
            cursor.execute(query)
            success = True
        except Exception as e:
            pgcode = e.pgcode
            success = False
        db_con.commit()

        return json.dumps(
            {'data': '', 'success': success, 'pgcode': pgcode},
            ensure_ascii=False), 200

    @bp.route('/insert_patient', methods=['POST'])
    def insert_patient():
        data = json.loads(request.data.decode('utf-8'))
        query = "insert into participante (cpf, nome) values ('{}', '{}')".format(data['cpf'], data['name'])
        pgcode = ''

        try:
            cursor = db_con.cursor()
            cursor.execute(query)
            success = True
        except Exception as e:
            pgcode = e.pgcode
            success = False
        db_con.commit()

        return json.dumps(
            {'data': '', 'success': success, 'pgcode': pgcode},
            ensure_ascii=False), 200

    return bp
