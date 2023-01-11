import os
def descompactador(diretorioatual:str = os.getcwd() , diretoriodestino:str =  os.getcwd()):
    """
        Buscamos no diretório informado os arquivos zip e faz a descompactação do mesmo no diretório também informado

        Parâmetros:
            diretorioatual : onde estaremos fazendo a busca
            diretoriodestino : para onde estaremos descompactando os arquivos
        
        Padrão
            os.getcwd() : Por padrão buscamos e retornamos o diretório atual onde você está rodando o script (Massa né)

        Libs utilizadas:
            OS : replica as funcionalidades do Sistema Operacional com Python (Massa também né?)
            zipfile.ZipFile : Como o nome diz replica um WinRaz da vida e faz toda a mágica por trás


    """
    from zipfile import ZipFile, BadZipFile, LargeZipFile
    os.system('cls')
    
    #diretorioatual = os.getcwd()
    #diretoriodestino = f'{diretorioatual}/ESTABELECIMENTOSCSV/'
    
    all_files = list(filter(lambda x: '.zip' in x, os.listdir(f'{diretorioatual}/')))
    for file in all_files:
        dirfile = os.path.abspath(f'{diretorioatual}/{file}')
        try:
            with ZipFile(dirfile,'r') as zlist:
                zlist.extractall(path=f'{diretoriodestino}/')
                zlist.close()
        except BadZipFile:
            print(f'Não dá pra descompactar o arquivo {file}, está corrompido.')
            continue
        except LargeZipFile:
            print(f'Não é possível descompactar o arquivo {file}, é grande demais.')
            continue
        except:
            print(f'Não deu pra baixar o arquivo {file} por algum motivo')

        """for i in all_files:
            print(os.path.abspath(i))"""
    return 'Processo de descompactação concluído'
        