from sqlalchemy.orm import Session
from sqlalchemy import distinct, func
import modelo


"""def create_item(db: Session, item: esquema.ItemCreate, Estabelecimento: str):
    db_item = modelo.Item(**item.dict(), Estabelecimento=Estabelecimento)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item"""

def get_estabelecimentos_by_estado(db:Session, estado:str):
    contagem = db.query(modelo.Item).filter(modelo.Item.Estado == estado).count()
    return contagem ,db.query(modelo.Item).filter(modelo.Item.Estado == estado).all()

def get_estabelecimentos_by_bandeira(db:Session,bandeira:str):
    contagem = db.query(modelo.Item).filter(modelo.Item.BANDEIRA == bandeira).count()
    return contagem, db.query(modelo.Item).filter(modelo.Item.BANDEIRA == bandeira).all()

def get_estabelecimentos_by_bandeira_e_estado(db:Session,estado:str,bandeira:str):
    contagem = db.query(modelo.Item).filter(modelo.Item.BANDEIRA == bandeira,modelo.Item.Estado == estado).count()
    return contagem, db.query(modelo.Item).filter(modelo.Item.BANDEIRA == bandeira ,modelo.Item.Estado == estado).all()
    
