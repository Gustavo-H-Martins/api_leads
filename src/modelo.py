from sqlalchemy import Boolean, Column, ForeignKey, Integer, String 
from sqlalchemy.orm import relationship  
from db import Base

class Item(Base):
    __tablename__ = 'EXTRAÇÃO_DE_LEADS'
    Estabelecimento = Column(String, index=True)
    Endereço = Column(String, primary_key=True ,index=True)
    Cidade_UF = Column(String, index=True)
    Telefone = Column(String, unique=True, index=True)
    Latitude = Column(String, index=True)
    Longitude = Column(String, index=True)
    Municipio = Column(String, index=True)
    Estado = Column(String, index=True)
    Logradouro = Column(String, index=True)
    Numero = Column(String, index=True)
    PADRAO_IBGE = Column(String, index=True)
    BANDEIRA = Column(String, index=True)
