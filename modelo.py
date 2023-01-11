from sqlalchemy import Boolean, Column, ForeignKey, Integer, String 
from sqlalchemy.orm import relationship  
from db import Base

class User(Base):
    __tablename__ = 'estabelecimentos'

class Item(Base):
    __tablename__ = 'items'
