"""Parse Config"""

# import configparser
# from os import environ

# config = configparser.ConfigParser()
# config.read(environ["SETTINGS_FILE"] if "SETTINGS_FILE" in environ else "settings.ini")

DATABASE_CONNECTION_STRING = "sqlite+aiosqlite:///db.sqlite"
#   config.get("database", "database_connection_string")
