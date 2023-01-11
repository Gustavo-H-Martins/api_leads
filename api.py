from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import crud, modelo
from db import sessaolocal, motor 
import json
modelo.Base.metadata.create_all(bind=motor)
api = FastAPI()

def get_db():     
    db = sessaolocal()     
    try:         
        yield db     
    finally:
         db.close()


@api.get('/estabelecimento/estado={Estado}')
def busca_estabelecimento_estado(Estado: str, db: Session = Depends(get_db)):
    db_item_estado = crud.get_estabelecimentos_by_estado(db, Estado=Estado)
    if db_item_estado is None:
        raise   HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="UF Não encontrada")
    return db_item_estado

@api.get('/estabelecimento/bandeira={BANDEIRA}')
def busca_estabelecimento_bandeira(BANDEIRA: str, db: Session = Depends(get_db)):
    db_item_bandeira = crud.get_estabelecimentos_by_bandeira(db, BANDEIRA=BANDEIRA)
    if db_item_bandeira is None:
        raise   HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="bandeira Não encontrada")
    return db_item_bandeira

@api.get('/')
def get_index():
    return """Api de acesso aos dados de cartões benefícios
    ALELO, BEN VISA VALE, SODEXO, TICKET, VR"""

@api.get('/estabelecimentos')
def get_estabelecimentos():
    return [{"Estabelecimento":"DOCE ANA","Endere\u00e7o":"RUA RUA PAULINO DE SOUZA 14, 14 JDNOVAPALMARES, ZACARIAS - SP","Cidade_UF":" ZACARIAS,  SP","Telefone":"(19) 3876-9456","Latitude":-23.0435384,"Longitude":-47.0167894,"Municipio":"ZACARIAS","Estado":"SP","Logradouro":"RUA RUA PAULINO DE SOUZA ","Numero":"14","PADRAO_IBGE":"ZACARIAS","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ALEXANDRO BARROS DE SOUS","Endere\u00e7o":"AVENIDA LAURO SODRE 1321, 1321 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.0985512,"Longitude":-49.9483735,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"AVENIDA LAURO SODRE ","Numero":"1321","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"AMORE MILHO","Endere\u00e7o":"RUA BRASIL 337, 337 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-3000","Latitude":-7.1051196,"Longitude":-49.9409901,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA BRASIL ","Numero":"337","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ANNE PRISCILLA SIMOES CO","Endere\u00e7o":"RUA VALDEIS DIVINO DUTRA 20, 20 SETOR MARAJOARA II, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.0963578,"Longitude":-49.9334461,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA VALDEIS DIVINO DUTRA ","Numero":"20","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ATACADAO DU LAR","Endere\u00e7o":"RUA GOROTIRE 0, 0 QD29 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-3666","Latitude":-7.0952509,"Longitude":-49.9377932,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA GOROTIRE ","Numero":"0","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ATACADAO MACRE","Endere\u00e7o":"GOROTIRE, 58 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3346-5857","Latitude":-7.1056658,"Longitude":-49.9400741,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"GOROTIRE","Numero":"58","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ATELIE BRENDA THILMAN CO","Endere\u00e7o":"RUA GOROTIRE 0, 0 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-5556","Latitude":-7.0952509,"Longitude":-49.9377932,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA GOROTIRE ","Numero":"0","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"ATLANTA BEER","Endere\u00e7o":"AVENIDA XINGU 20, 20 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.1004986,"Longitude":-49.9561134,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"AVENIDA XINGU ","Numero":"20","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"C E M SOLUCOES ADMINISTR","Endere\u00e7o":"RUA GOROTIRE 0, 0 QD21 LT08 CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.0952509,"Longitude":-49.9377932,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA GOROTIRE ","Numero":"0","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"C N CARNES LTDA ME","Endere\u00e7o":"RUA GOROTIRE 0, 0 Q11 LT21 B CENTRO, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.0952509,"Longitude":-49.9377932,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA GOROTIRE ","Numero":"0","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"},{"Estabelecimento":"CASA DO ACAI DISTRIBUIDO","Endere\u00e7o":"RUA RIO VERMELHO 92, 92 MARAJOARA, XINGUARA - PA","Cidade_UF":" XINGUARA,  PA","Telefone":"(94) 3426-0000","Latitude":-7.0945619,"Longitude":-49.9486731,"Municipio":"XINGUARA","Estado":"PA","Logradouro":"RUA RIO VERMELHO ","Numero":"92","PADRAO_IBGE":"XINGUARA","BANDEIRA":"BENVISAVALE"}]

