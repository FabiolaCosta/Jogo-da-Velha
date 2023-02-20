var rodada = 1;

// Matriz que vai controlar as coordenadas do jogo a partir das marcações
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready( function(){

    // Botão iniciar jogo
    $('#btn-start').click( function(){

        // validação dos nicknames dos jogadores
        if(($('#nickname_jogador1').val()== '')){
            //.val() recurepara o valor compo
            alert('Por favor, informe o apelido do jogador 1.');
            return false;
        }
        else if(($('#nickname_jogador2').val()== '')){
            alert('Por favor, informe o apelido do jogador 2.');
            return false;
        }       
        
        // Exibir os apelidos dos jogadores
        $('#nome_jogador1').html($('#nickname_jogador1').val());
        //.html funciona igual ao inerHtml
        $('#nome_jogador2').html($('#nickname_jogador2').val());

        // Controla a visualização das divs
        $('#palco_jogo').show();
        $('#inicio_jogo').hide();

    });

    // Identificando as posiçoes das jogadas
    $('.jogada').click( function(){

        // Aqui estamos recupendo o id do campo clicado
        // this faz referencia ao elemento do contexto do click
        var id_campo_clicado = this.id;
        
        // .off retira o evento click
        $('#'+id_campo_clicado).off();
        jogada(id_campo_clicado);
    });

    function jogada(id){
        var icone = '';
        var marcacao = 0;

        // Validando a vez de cada jogador
        if((rodada % 2) == 1){
            icone = 'url("./img/marcacao_1.png")';
            marcacao = -1;
        }
        else{
            icone = 'url("./img/marcacao_2.png")';
            marcacao = 1;
        }

        // Incrementando a rodada para saber a ordem da jogada dos jogadores
        rodada++;

        // Adicionando a imagem no jogo
        $('#'+id).css('background-image', icone);

        // Separando o id para inserir na marcação da matriz
        var linha_coluna = id;
        //Obs: se eu tivesse colocado o id como 'a-1' era só usar o split para destrinchar o id. Ex: var linha_coluna = id.split('-');

        // A primeira chave esta recurendo a posição da linha, já na seguanda esta recurepando a posição da coluna
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = marcacao;
        console.log(matriz_jogo);

        verifica_combinacao();
    }

    function verifica_combinacao(){

        var pontos = 0;
        // Verificação na horizontal
        for(var i=1; i<=3; i++){
            pontos = pontos + matriz_jogo['a'][i];
            ganhador(pontos);  
        }

        pontos = 0;
        for(var i=1; i<=3; i++){
            pontos = pontos + matriz_jogo['b'][i];
            ganhador(pontos);  
        }

        pontos = 0;
        for(var i=1; i<=3; i++){
            pontos = pontos + matriz_jogo['c'][i];
            ganhador(pontos);  
        }

        // Verificação na vertical
        for(var l=1; l<=3; l++){
            pontos = 0;
            pontos += matriz_jogo['a'][l];
            pontos += matriz_jogo['b'][l];
            pontos += matriz_jogo['c'][l];  
            ganhador(pontos);          
        }

        // Verificação na diagonal
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);  

        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);  
    }

    function ganhador(pontos){
        if(pontos == -3){
            var jogador1 = $('#nickname_jogador1').val();
            alert(jogador1 + ' venceu');
            $('.jogada').off();
        }
        else if(pontos == 3){
            var jogador2 = $('#nickname_jogador2').val();
            alert(jogador2 + ' venceu');
            $('.jogada').off();
        }
    }
});
