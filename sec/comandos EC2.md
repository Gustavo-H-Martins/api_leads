### Acessar o servidor
```
    ssh -i "chave_privada.pem" ubuntu@ec2-15-228-159-250.sa-east-1.compute.amazonaws.com
```

### Migrar arquivos
```
    scp -r -i "chave_privada.pem" ["arquivo", "pasta de arquivos", "todos os arquiivos com uma extensão tipo *.csv"] ubuntu@ec2-15-228-159-250.sa-east-1.compute.amazonaws.com:~
```