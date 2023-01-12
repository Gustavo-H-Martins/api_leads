from sqlalchemy.orm import Session
import modelo


"""def create_item(db: Session, item: esquema.ItemCreate, Estabelecimento: str):
    db_item = modelo.Item(**item.dict(), Estabelecimento=Estabelecimento)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item"""

def get_estabelecimentos_by_estado(db:Session, Estado:str):
    return db.query(modelo.Item).filter(modelo.Item.Estado == Estado).all()

def get_estabelecimentos_by_bandeira(db:Session,BANDEIRA:str):
    return db.query(modelo.Item).filter(modelo.Item.BANDEIRA == BANDEIRA).all()
    
