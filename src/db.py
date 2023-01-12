from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker
from descompactador  import descompactador
import os
import sys
sys.setrecursionlimit(1500)
# Descompacata o banco que está zipado
descompactador(diretorioatual='./', diretoriodestino='./')

# descobre o nome do database
db_name = list(filter(lambda x: '.db' in x, os.listdir(r'./')))[0]

# instancia o SQL Alchemy
SQLALCHEMY_DATABASE_URL = f"sqlite:///./{db_name}"

# Define o motor
motor = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
# Define sessão local
sessaolocal = sessionmaker(autocommit=False, autoflush=False,
bind=motor)

Base = declarative_base()