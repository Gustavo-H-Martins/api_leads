# Api de acesso aos dados de cartões benefícios
        ALELO, BEN VISA VALE, SODEXO, TICKET, VR
        Rode este comando no terminal: 
        cd ./src/
        uvicorn api:api --reload --host 192.168.10.48

        após isso acesse os seguintes links:
        http://localhost:8000/estabelecimento/estado=( substitua o que está em parênteses pelo parâmetro)
        exemplo : http://localhost:8000/estabelecimento/estado=to

        http://localhost:8000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)
        exemplo: http://localhost:8000/estabelecimento/bandeira=benvisavale

        http://localhost:8000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)/estado=( substitua o que está em parênteses pelo parâmetro)        
        exemplo: http://localhost:8000/estabelecimento/bandeira=vr/estado=ac
