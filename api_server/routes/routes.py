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

    @bp.route('/get_analytics', methods=['GET'])
    def get_analytics():
        nurse_fields = [
            'nome',
            'count(*)'
        ]
        nurse_query = 'select {} from consulta c join enfermeiro e on c.enfermeiro = e.cofen group by ' \
            'c.enfermeiro, e.nome order by count(*) desc;'.format(','.join(nurse_fields))
        nurse_parsed_results = []

        hour_fields = [
            "concat(to_char(dia, '00'), '/', to_char(mes, '00'), '/', ano, ' ', hora, 'h')",
            'quantidade'
        ]
        hour_query = "select {} from (select extract(day from to_timestamp(data_hora_entrada, 'dd/mm/yyyy hh24:mi:ss')) as dia, " \
            "extract(month from to_timestamp(data_hora_entrada, 'dd/mm/yyyy hh24:mi:ss')) as mes, " \
            "extract(year from to_timestamp(data_hora_entrada, 'dd/mm/yyyy hh24:mi:ss')) as ano, " \
            "extract(hour from to_timestamp(data_hora_entrada, 'dd/mm/yyyy hh24:mi:ss')) as hora, count(*) as quantidade " \
            "from consulta group by dia, mes, ano, hora) a;".format(','.join(hour_fields))
        hour_parsed_results = []

        event_type_fields = [
            'e.tipo',
            'count(*)'
        ]
        event_type_query = 'select {} from consulta c join participa p on c.participante = p.participante' \
            ' join evento e on e.nome = p.evento where c.data_hora_entrada between e.data_hora_inicio' \
            ' and e.data_hora_fim group by e.tipo;'.format(','.join(event_type_fields))
        event_type_parsed_results = []

        participant_fields = [
            'participante.nome',
            'participante.cpf'
        ]
        participant_query = "select distinct {} from participa par join participante on " \
            "par.participante = participante.cpf where not exists (select e.nome from evento e where e.tipo = 'festa' " \
            "except(select p.evento from participa p where p.participante = par.participante));".format(','.join(participant_fields))
        participant_parsed_results = []

        try:
            nurse_parsed_results = make_db_query(db_con, nurse_query, nurse_fields)
            hour_parsed_results = make_db_query(db_con, hour_query, hour_fields)
            event_type_parsed_results = make_db_query(db_con, event_type_query, event_type_fields)
            participant_parsed_results = make_db_query(db_con, participant_query, participant_fields)
            success = True
        except Exception:
            success = False
        db_con.commit()

        return json.dumps(
            {'data': { 'nurse': nurse_parsed_results, 'hour': hour_parsed_results, 'event': event_type_parsed_results,
            'participant': participant_parsed_results }, 'success': success},
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
