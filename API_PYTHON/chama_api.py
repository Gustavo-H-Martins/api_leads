import socket
import os

ip = socket.gethostbyname(socket.gethostname())
print(f"Rode este comando no terminal: \ncd ./src/ \nuvicorn api:api --reload --host {ip}")
link1 = f'http://{ip}:8000/estabelecimento/estado=( substitua o que está em parênteses pelo parâmetro)'
link2 = f'http://{ip}:8000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)'
link3 = f'http://{ip}:8000:8000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)/estado=( substitua o que está em parênteses pelo parâmetro)'
print(f"\n após isso acesse os seguintes links:"
        f"\n{link1} \nexemplo : http://{ip}:8000/estabelecimento/estado=to \n" 
        f"\n{link2} \nexemplo: http://{ip}:8000/estabelecimento/bandeira=benvisavale \n"
        f"\n{link3} \nexemplo: http://{ip}:8000/estabelecimento/bandeira=vr/estado=ac \n")
