import psycopg2

from routes import create_app


db_con = psycopg2.connect(
    host='localhost',
    database='postgres',
    user='postgres',
    password='postgres')
app = create_app(db_con)


if __name__ == '__main__':
    app.run(debug=True)
