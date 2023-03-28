from sqlalchemy.orm import Session
from sqlalchemy import distinct, func, and_
import modelo


"""def create_item(db: Session, item: esquema.ItemCreate, Estabelecimento: str):
    db_item = modelo.Item(**item.dict(), Estabelecimento=Estabelecimento)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item"""





def get_estabelecimentos_by_estado(db:Session, estado:str):
    estabelecimentos_estado = db.query(modelo.Item).filter(modelo.Item.Estado == estado)
    #contagem = estabelecimentos_estado.count()

    return estabelecimentos_estado.all()

def get_estabelecimentos_by_bandeira(db:Session,bandeira:str):
    estabelecimentos_bandeira = db.query(modelo.Item).filter(modelo.Item.BANDEIRA == bandeira)
    #contagem = estabelecimentos_bandeira.count()
    return   estabelecimentos_bandeira.all()

def get_estabelecimentos_by_bandeira_e_estado(db:Session,estado:str,bandeira:str):
    bandeira_estado = db.query(modelo.Item).filter(and_(modelo.Item.BANDEIRA == bandeira ,modelo.Item.Estado == estado))
    #contagem = bandeira_estado.count()
    return   bandeira_estado.all()
    