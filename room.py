from sqlalchemy import Column, String, Date, Integer, Numeric

from base import Base


class Room(Base):
    __tablename__ = 'Room'

    id = Column(Integer, primary_key=True)
    url = Column(String)
    max_size = Column(Integer)
    current_size = Column(Integer)
    data = Column(String)
    isDone = Column(Integer)

    def __init__(self, url, max_size, current_size, data, isDone) -> None:
        self.url = url
        self.max_size = max_size
        self.current_size = current_size
        self.data = data
        self.isDone = isDone
