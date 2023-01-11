from typing import List  
from pydantic import BaseModel

class ItemBase(BaseModel):     
    Estabelecimento: str     
    Endereço: str = None   
class ItemCreate(ItemBase):     
    pass
class Item(ItemBase):     
    BANDEIRA: str     
    Estabelecimento: str      
 
    class Config:         
        orm_mode = True

class UserBase(BaseModel):
    BANDEIRA: str
    Estabelecimento: str

class UserCreate(UserBase):
    BANDEIRA: str

class User(UserBase):
    BANDEIRA: int
    Estabelecimento: List[Item] = []
    class Config:         
        orm_mode = True