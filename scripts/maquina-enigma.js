/**************************************************************************
* Motor da Máquina Enigma
* Autor: José Paulo Bocelli Júnior
* Data: 12/04/2019
* Descrição: Trabalho de Desenvolvimento Web 1
***************************************************************************/

// Instancia máquina para fazer as configurações e começar o processo
var maquina = new maquina();

// Instancia Janela Modal
janelaModal = new mostraMensagem();

// Três variáveis que vão definir se Rotores, Posições e Plugs estão corretamente setados
var setRotores = false;
var setPosicoes = false;
var setPlugs = true; //É possível operar a máquina sem plugs, portanto essa variável a princípio é true

// Insere mensagens de configuração
inicializaInterface();

var contextoMaquina1 = document.getElementById("ativaDescriptografarTeclado");
contextoMaquina1.addEventListener("change", function () {
	var textoNormal = document.getElementById("textoTecladoNormal");
	var textoCriptografado = document.getElementById("textoTecladoCriptografado");

	reiniciaRotores();

	textoNormal.value = "";
	textoCriptografado.value = "";
});

var contextoMaquina3 = document.getElementById("ativaDescriptografarTXT");
contextoMaquina3.addEventListener("change", function () {
	var textoProcessado = document.getElementById('textoProcessado');

	textoProcessado.innerHTML = "";
});

var elementoArquivo = document.getElementById('inputArquivo');
elementoArquivo.addEventListener('change', processaArquivo, false);

function inicializaInterface() {
	/*
	* Essa função inicializa a interface inserindo mensagens e limpando campos
	*/

	if (!setRotores) {
		var caixaMensagemRotores = document.getElementById("caixaMensagemRotores");
		var caixaMensagemPlugs = document.getElementById("caixaMensagemPlugs");
		var caixaMensagemMaquina1 = document.getElementById("caixaMensagemMaquina1");
		var caixaMensagemMaquina2 = document.getElementById("caixaMensagemMaquina2");

		caixaMensagemRotores.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemRotores.classList.add("mensagem-danger");
		caixaMensagemRotores.style.display = "block";

		// Esses trechos de código estão funcionando e podem ser habilitados
		/*
		caixaMensagemPlugs.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemPlugs.classList.add("mensagem-danger");
		caixaMensagemPlugs.style.display = "block";

		caixaMensagemMaquina1.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemMaquina1.classList.add("mensagem-danger");
		caixaMensagemMaquina1.style.display = "block";

		caixaMensagemMaquina2.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemMaquina2.classList.add("mensagem-danger");
		caixaMensagemMaquina2.style.display = "block";
		*/
	}
}

function salvaRotores() {
	/*
	* Essa função faz a verificação da configuração dos Rotores antes de configurar a máquina
	*/

	var elementoRotor1 = document.getElementsByName("rotor1");
	var rotor1;
	for (indice in elementoRotor1) {
		if (elementoRotor1[indice].checked) {
			rotor1 = elementoRotor1[indice].value;
		}
	}

	var elementoRotor2 = document.getElementsByName("rotor2");
	var rotor2;
	for (indice in elementoRotor2) {
		if (elementoRotor2[indice].checked) {
			rotor2 = elementoRotor2[indice].value;
		}
	}

	var elementoRotor3 = document.getElementsByName("rotor3");
	var rotor3;
	for (indice in elementoRotor3) {
		if (elementoRotor3[indice].checked) {
			rotor3 = elementoRotor3[indice].value;
		}
	}

	var elementoPosicao1 = document.getElementById("posicao1");
	var posicao1 = elementoPosicao1.value;

	var elementoPosicao2 = document.getElementById("posicao2");
	var posicao2 = elementoPosicao2.value;

	var elementoPosicao3 = document.getElementById("posicao3");
	var posicao3 = elementoPosicao3.value;

	// Faz verificação dos Rotores
	if (rotor1 == rotor2) {
		// Mensagem de erro
		janelaModal.mensagem = "<p>Você não pode repetir a configuração dos Rotores!</p>";
		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();

		caixaMensagemRotores.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemRotores.classList.add("mensagem-danger");
		caixaMensagemRotores.style.display = "block";

		setRotores = false;
	} else {
		if (rotor1 == rotor3) {
			// Mensagem de erro
			janelaModal.mensagem = "<p>Você não pode repetir a configuração dos Rotores!</p>";
			janelaModal.textoBotaoFechar = "Fechar";
			janelaModal.estilo = "modal-danger";
			janelaModal.montar();
			janelaModal.mostrar();

			caixaMensagemRotores.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
			caixaMensagemRotores.classList.add("mensagem-danger");
			caixaMensagemRotores.style.display = "block";

			setRotores = false;
		} else {
			if (rotor2 == rotor3) {
				// Mensagem de erro
				janelaModal.mensagem = "<p>Você não pode repetir a configuração dos Rotores!</p>";
				janelaModal.textoBotaoFechar = "Fechar";
				janelaModal.estilo = "modal-danger";
				janelaModal.montar();
				janelaModal.mostrar();

				caixaMensagemRotores.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
				caixaMensagemRotores.classList.add("mensagem-danger");
				caixaMensagemRotores.style.display = "block";

				setRotores = false;
			} else {
				//Aplica a configuração usando o Método "configuracao" do Objeto "maquina"
				maquina.configuracao(rotor1, rotor2, rotor3);
				setRotores = true;

				caixaMensagemRotores.style.display = "none";
				limpaFormularios();

				janelaModal.mensagem = "<p>Rotores configurados com sucesso!</p>";
				janelaModal.textoBotaoFechar = "Fechar";
				janelaModal.estilo = "modal-success";
				janelaModal.montar();
				janelaModal.mostrar();
			}
		}
	}

	// Faz verificação das posições
	if ((posicao1 < 0 || posicao1 > 26 || posicao1 == "") ||
		(posicao2 < 0 || posicao2 > 26 || posicao2 == "") ||
		(posicao3 < 0 || posicao3 > 26 || posicao3 == "")) {

		// Mensagem de erro
		janelaModal.mensagem = "<p>O valor das posições dos Rotores devem estar entre 0 e 26!</p>";
		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();

		caixaMensagemRotores.innerHTML = "<p>Você ainda não configurou os Rotores!</p>";
		caixaMensagemRotores.classList.add("mensagem-danger");
		caixaMensagemRotores.style.display = "block";

		setPosicoes = false;
	} else {
		// Aplica a configuração usando o Método "posicaoInicial" do Objeto "maquina"
		limpaFormularios();
		maquina.posicaoInicial(posicao1, posicao2, posicao3);
		setPosicoes = true;
	}
}

function salvaPlugs() {
	/*
	* Essa função faz a verificação da configuração dos Rotores antes de configurar a máquina
	*/

	setPlugs = true;
	var i; // Variável de controle para laço for

	// Pega Plugs, ou seja, os selects com a classe "letraEntrada" e "letraSaida"
	var plugsEntrada = document.getElementsByClassName("letraEntrada");
	var plugsSaida = document.getElementsByClassName("letraSaida");

	//Nem todos os métodos de arrays funcionam em objetos html (como o Javascrit chama); é necessária conversão
	plugsEntrada = objToArray(plugsEntrada);
	plugsSaida = objToArray(plugsSaida);

	//Faz um reset dos Plugs salvos (veja a construção do método para saber como funciona)
	maquina.setPlug("A", "A");

	//Verifica se letras estão sendo usadas mais de uma vez nos Plugs
	if (setPlugs) {
		if (verificaItemRepetido(plugsEntrada.concat(plugsSaida))) {
			//Mensagem de erro
			janelaModal.mensagem = "<p>Você não pode usar uma letra mais de uma vez na configuração dos Plugs, seja como entrada ou saída!</p>";
			janelaModal.textoBotaoFechar = "Fechar";
			janelaModal.estilo = "modal-danger";
			janelaModal.montar();
			janelaModal.mostrar();

			caixaMensagemPlugs.innerHTML = "<p>Você temconfigurações inválidas de Plugs! Escolha configurações válidas ou exclua os Plups e clique em salvar!</p>";
			caixaMensagemPlugs.classList.add("mensagem-danger");
			caixaMensagemPlugs.style.display = "block";

			setPlugs = false;
		} else {
			// Adiciona Plugs ao Objeto "maquina" usando o Método "setPlug" diversas vezes
			for (i = 0; i < plugsEntrada.length; i++) {
				maquina.setPlug(plugsEntrada[i], plugsSaida[i]);
			}
			setPlugs = true;

			caixaMensagemPlugs.style.display = "none";
			limpaFormularios();

			// Mensagem de sucesso
			janelaModal.mensagem = "<p>Conjunto de Plugs configurado com sucesso!</p>";
			janelaModal.textoBotaoFechar = "Fechar";
			janelaModal.estilo = "modal-success";
			janelaModal.montar();
			janelaModal.mostrar();
		}
	}
}

function tecladoVirtual(letra) {
	var letra;
	var letraCriptografada, letraDescriptografada;
	var textoNormal = document.getElementById("textoTecladoNormal");
	var textoCriptografado = document.getElementById("textoTecladoCriptografado");

	if (setPlugs && setPosicoes && setPlugs) {
		if (letra == "Enter") {
			textoNormal.value += "\n";
			textoCriptografado.value += "\n";
			maquina.movimentaRotores(0);
		} else if (letra == "BackSpace") {
			textoNormal.value = (textoNormal.value).slice(0, -1);
			textoCriptografado.value = (textoCriptografado.value).slice(0, -1);
			maquina.movimentaRotores(-1);
		} else {
			if (contextoMaquina1.checked == true) {
				letraDescriptografada = maquina.descriptografar(letra);
				textoNormal.value += letraDescriptografada;
				textoCriptografado.value += letra;
			} else {
				letraCriptografada = maquina.criptografar(letra);
				textoCriptografado.value += letraCriptografada;
				textoNormal.value += letra;
			}
		}
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<ul>";
		if (!setRotores) {
			janelaModal.mensagem += "<li>As configurações dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPosicoes) {
			janelaModal.mensagem += "<li>As posições dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPlugs) {
			janelaModal.mensagem += "<li>As configurações dos Plugs são inválidas!</li>";
		}

		janelaModal.mensagem += "</ul>";

		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();

	}// Fim: if(setPlugs && setPosicoes && setPlugs)

}

function criptografarTexto() {
	var textoCriptografado = "";
	var elementoTextoNormal = document.getElementById("textoNormal");
	var elementoTextoCriptografado = document.getElementById("textoCriptografado");
	var textoNormal = elementoTextoNormal.value.split("");
	var i;

	if (setPlugs && setPosicoes && setPlugs) {

		// Volta Rotores a configuração inicial
		reiniciaRotores()

		for (i = 0; i < textoNormal.length; i++) {
			textoCriptografado += maquina.criptografar(textoNormal[i]);
		}

		elementoTextoCriptografado.value = textoCriptografado;

		// Repcrocessa Máquina 1
		reprocessaMaquina1();
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<ul>";
		if (!setRotores) {
			janelaModal.mensagem += "<li>As configurações dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPosicoes) {
			janelaModal.mensagem += "<li>As posições dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPlugs) {
			janelaModal.mensagem += "<li>As configurações dos Plugs são inválidas!</li>";
		}

		janelaModal.mensagem += "</ul>";

		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();

	}// Fim: if(setPlugs && setPosicoes && setPlugs)
}

function descriptografarTexto() {
	var textoNormal = "";
	var elementoTextoNormal = document.getElementById("textoNormal");
	var elementoTextoCriptografado = document.getElementById("textoCriptografado");
	var textoCriptografado = elementoTextoCriptografado.value.split("");
	var i;

	if (setPlugs && setPosicoes && setPlugs) {

		// Volta Rotores a configuração inicial
		reiniciaRotores()

		for (i = 0; i < textoCriptografado.length; i++) {
			textoNormal += maquina.descriptografar(textoCriptografado[i]);
		}

		elementoTextoNormal.value = textoNormal;

		// Repcrocessa Máquina 1
		reprocessaMaquina1();
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<ul>";
		if (!setRotores) {
			janelaModal.mensagem += "<li>As configurações dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPosicoes) {
			janelaModal.mensagem += "<li>As posições dos Rotores ainda não foram configuradas!</li>";
		}

		if (!setPlugs) {
			janelaModal.mensagem += "<li>As configurações dos Plugs são inválidas!</li>";
		}

		janelaModal.mensagem += "</ul>";

		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();

	}// Fim: if(setPlugs && setPosicoes && setPlugs)
}

function processaArquivo(e) {
	// Verifica se o navegador possui API nativa do HTML5 para tratamento de arquivos
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		if (setPlugs && setPosicoes && setPlugs) {
			// Extensões permitidas
			var extensoesPermitidas = /text.*/;
			// Ponteiro para o arquivo
			var arquivoParaProcessamento = elementoArquivo.files[0];
			// Verifica se a extensão é compatível
			if (arquivoParaProcessamento.type.match(extensoesPermitidas)) {

				// Inicializa o objeto que vai tratar o arquivo
				var objetoArquivo = new FileReader();
				objetoArquivo.onload = function (e) {

					// Reinicia os Rotores
					reiniciaRotores();

					let elementoTextoProcessado = document.getElementById('textoProcessado');
					let arrayConteudoArquivo = objetoArquivo.result.split("");
					let mensagem = "";
					let i;

					if (contextoMaquina3.checked == true) {
						for (i = 0; i < arrayConteudoArquivo.length; i++) {
							mensagem += maquina.descriptografar(arrayConteudoArquivo[i]);
						}
						elementoTextoProcessado.innerText = mensagem;
					} else {
						for (i = 0; i < arrayConteudoArquivo.length; i++) {
							mensagem += maquina.criptografar(arrayConteudoArquivo[i]);
						}
						elementoTextoProcessado.innerText = mensagem;
					}

					// Reprocessa Máquina 1
					reprocessaMaquina1();
				}
				objetoArquivo.readAsText(arquivoParaProcessamento);
			} else {
				// Mensagem de erro
				janelaModal.mensagem = "<p>Selecione um arquivo com extensão .txt!</p>";
				janelaModal.textoBotaoFechar = "Fechar";
				janelaModal.estilo = "modal-danger";
				janelaModal.montar();
				janelaModal.mostrar();
			}
		} else {
			// Mensagem de erro
			janelaModal.mensagem = "<ul>";
			if (!setRotores) {
				janelaModal.mensagem += "<li>As configurações dos Rotores ainda não foram configuradas!</li>";
			}

			if (!setPosicoes) {
				janelaModal.mensagem += "<li>As posições dos Rotores ainda não foram configuradas!</li>";
			}

			if (!setPlugs) {
				janelaModal.mensagem += "<li>As configurações dos Plugs são inválidas!</li>";
			}

			janelaModal.mensagem += "</ul>";

			janelaModal.textoBotaoFechar = "Fechar";
			janelaModal.estilo = "modal-danger";
			janelaModal.montar();
			janelaModal.mostrar();
		}
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<p>Seu navegador não tem suporte a processamento de texto!</p>";
		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-danger";
		janelaModal.montar();
		janelaModal.mostrar();
	}
}

function reiniciaRotores() {
	maquina.historicoRotores = maquina.historicoRotores.slice(0, 1);

	maquina.posicaoInicial(maquina.historicoRotores[0][0], maquina.historicoRotores[0][1], maquina.historicoRotores[0][2]);
}

function reprocessaMaquina1() {
	/*
	* Função usada para reprocessar conteúdo da Máquina 1, que garante a independência da máquinas.
	* É executada toda vez que a Máquina 2 ou 3 é usada.
	*/

	var textoNormal = document.getElementById("textoTecladoNormal");
	var textoCriptografado = document.getElementById("textoTecladoCriptografado");

	if (contextoMaquina1.checked == true) {
		if (textoNormal.value.length > 0) {
			reiniciaRotores();

			let conteudoForm = textoNormal.value.split("");
			let mensagem = "";
			let i;

			for (i = 0; i < conteudoForm.length; i++) {
				mensagem += maquina.descriptografar(conteudoForm[i]);
			}

			textoCriptografado.value = mensagem;
		}
	} else {
		if (textoNormal.value.length > 0) {
			reiniciaRotores();

			let conteudoForm = textoCriptografado.value.split("");
			let mensagem = "";
			let i;

			for (i = 0; i < conteudoForm.length; i++) {
				mensagem += maquina.criptografar(conteudoForm[i]);
			}

			textoNormal.value = mensagem;
		}

	}
}

function limpaFormularios() {
	var textoNormal = document.getElementById("textoTecladoNormal");
	var textoCriptografado = document.getElementById("textoTecladoCriptografado");

	var elementoTextoNormal = document.getElementById("textoNormal");
	var elementoTextoCriptografado = document.getElementById("textoCriptografado");

	var textoProcessado = document.getElementById('textoProcessado');

	textoNormal.value = "";
	textoCriptografado.value = "";

	elementoTextoNormal.value = "";
	elementoTextoCriptografado.value = "";

	textoProcessado.innerHTML = "";

}

function verificaItemRepetido(vetor) {
	/*
	* Função verifica se um array tem valores repetidos
	*/
	var vetor;
	var teste;
	var i;

	for (i = 0; i < vetor.length; i++) {
		var quantidade = 0;
		teste = vetor.indexOf(vetor[i]);

		while (teste != -1) {
			quantidade++;
			if (quantidade > 1) {
				return true;
			}
			teste = vetor.indexOf(vetor[i], teste + 1);
		}

	}
	return false;
}

function objToArray(objeto) {
	/*
	* Função transforma um objeto html, oriundo de uma composição de inputs, em um objeto de array
	*/
	var i;
	var objeto;
	var vetor = [];
	// Verifica se é array
	if (!Array.isArray(objeto)) {
		for (i = 0; i < objeto.length; i++) {
			vetor.push(objeto[i].value);
		}
	} else {
		vetor = objeto.slice();
	}

	return vetor;
}

function addPlug() {
	/*
	* Função que adiciona os Plug a interface gráfica e faz verificações quanto a quantidade de Plugs no sistema
	*/

	var gruposPlug = document.getElementsByClassName("grupoPlug"); //objeto html com as informações dos grupos de Plugs

	// Faz verificação para impedir um número de Plugs maior que 13 no sistema.
	if (gruposPlug.length < 13) {
		// Usa métodos conhecidos de manipulação de DOM para introduzir os Plugs a interface
		var divControle = document.createElement("div");
		divControle.setAttribute("class", "grupoPlug");
		var select = document.createElement("select");
		select.setAttribute("class", "letraEntrada");

		var option = document.createElement("option");
		option.value = "A";
		var labelOption = document.createTextNode("A");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "B";
		var labelOption = document.createTextNode("B");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "C";
		var labelOption = document.createTextNode("C");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "D";
		var labelOption = document.createTextNode("D");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "E";
		var labelOption = document.createTextNode("E");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "F";
		var labelOption = document.createTextNode("F");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "G";
		var labelOption = document.createTextNode("G");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "H";
		var labelOption = document.createTextNode("H");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "I";
		var labelOption = document.createTextNode("I");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "J";
		var labelOption = document.createTextNode("J");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "K";
		var labelOption = document.createTextNode("K");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "L";
		var labelOption = document.createTextNode("L");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "M";
		var labelOption = document.createTextNode("M");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "N";
		var labelOption = document.createTextNode("N");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "O";
		var labelOption = document.createTextNode("O");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "P";
		var labelOption = document.createTextNode("P");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Q";
		var labelOption = document.createTextNode("Q");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "R";
		var labelOption = document.createTextNode("R");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "S";
		var labelOption = document.createTextNode("S");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "T";
		var labelOption = document.createTextNode("T");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "U";
		var labelOption = document.createTextNode("U");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "V";
		var labelOption = document.createTextNode("V");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "W";
		var labelOption = document.createTextNode("W");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "X";
		var labelOption = document.createTextNode("X");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Y";
		var labelOption = document.createTextNode("Y");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Z";
		var labelOption = document.createTextNode("Z");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		// Adiciona select a divControle
		divControle.appendChild(select);

		// Cria setinha e adiciona divControle
		var seta = document.createTextNode("=");
		divControle.appendChild(seta);

		var select = document.createElement("select");
		select.setAttribute("class", "letraSaida");

		var option = document.createElement("option");
		option.value = "A";
		var labelOption = document.createTextNode("A");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "B";
		var labelOption = document.createTextNode("B");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "C";
		var labelOption = document.createTextNode("C");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "D";
		var labelOption = document.createTextNode("D");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "E";
		var labelOption = document.createTextNode("E");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "F";
		var labelOption = document.createTextNode("F");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "G";
		var labelOption = document.createTextNode("G");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "H";
		var labelOption = document.createTextNode("H");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "I";
		var labelOption = document.createTextNode("I");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "J";
		var labelOption = document.createTextNode("J");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "K";
		var labelOption = document.createTextNode("K");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "L";
		var labelOption = document.createTextNode("L");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "M";
		var labelOption = document.createTextNode("M");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "N";
		var labelOption = document.createTextNode("N");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "O";
		var labelOption = document.createTextNode("O");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "P";
		var labelOption = document.createTextNode("P");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Q";
		var labelOption = document.createTextNode("Q");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "R";
		var labelOption = document.createTextNode("R");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "S";
		var labelOption = document.createTextNode("S");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "T";
		var labelOption = document.createTextNode("T");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "U";
		var labelOption = document.createTextNode("U");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "V";
		var labelOption = document.createTextNode("V");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "W";
		var labelOption = document.createTextNode("W");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "X";
		var labelOption = document.createTextNode("X");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Y";
		var labelOption = document.createTextNode("Y");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);

		var option = document.createElement("option");
		option.value = "Z";
		var labelOption = document.createTextNode("Z");
		// Adiciona label ao option
		option.appendChild(labelOption);
		// Adiciona option ao select
		select.appendChild(option);


		// Adiciona select a divControle
		divControle.appendChild(select);

		// Adiciona divControle a div plugs
		document.getElementById("plugs").appendChild(divControle);
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<p>Você atingiu o limite máximo de Plugs!</p>";
		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-warning";
		janelaModal.montar();
		janelaModal.mostrar();
	}

}

function remPlug() {
	var gruposPlug = document.getElementsByClassName("grupoPlug"); //objeto html com as informações dos grupos de plug
	/*
	* Função que remove os Plug a interface gráfica e faz verificações quanto a quantidade de Plugs no sistema
	*/

	// Faz verificação para ver se ainda existem Plugs
	if (gruposPlug.length > 0) {
		// Remove o último Plug
		document.getElementById("plugs").removeChild(gruposPlug[gruposPlug.length - 1]);
	} else {
		// Mensagem de erro
		janelaModal.mensagem = "<p>Você não tem mais Plugs!</p>";
		janelaModal.textoBotaoFechar = "Fechar";
		janelaModal.estilo = "modal-warning";
		janelaModal.montar();
		janelaModal.mostrar();
	}
}

function mostraMensagem() {
	/*
	* Função que exibe mensagens ao usuário
	*/

	this.mensagem = "Mensagem";
	this.estilo = "modal-primary";
	this.textoBotaoFechar = "Fechar";
	this.textoBotaoExecutar = null // Não obrigatório
	this.funcao = null // Não obrigatório
	var janelaModal = document.getElementById("modal");

	this.montar = function () {
		var janelaModalConteudo = document.getElementById("modalConteudo");
		janelaModalConteudo.setAttribute("class", this.estilo);
		conteudoInterno = this.mensagem;
		conteudoInterno += "<div style='text-align: center;'>"
		conteudoInterno += "<button type='button' class='botao-" + this.estilo + "' onClick='janelaModal.fechaModal()'>" + this.textoBotaoFechar + "</button>\n";
		conteudoInterno += "</div>";
		janelaModalConteudo.innerHTML = conteudoInterno;
	}

	this.mostrar = function () {
		janelaModal.style.visibility = "visible";
	}

	this.fechaModal = function () {
		janelaModal.style.visibility = "hidden";
	}
}

function maquina() {
	var rotor1;
	var rotor2;
	var rotor3;

	var caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

	var posicaoRotor1;
	var posicaoRotor2;
	var posicaoRotor3;
	this.historicoRotores = [];

	var plugEntrada = [];
	var plugSaida = [];

	this.configuracao = function (setRotor1, setRotor2, setRotor3) {
		/*
		* Método que atribui aos três Rotores usados no sistema as suas devidas configurações
		*/
		c_rotor = new Array(5);
		c_rotor[0] = new Array(27);
		c_rotor[0] = ["L", "G", "Q", "N", "M", "W", " ", "Y", "V", "T", "E", "B", "O", "D", "U", "H", "Z", "F", "K", "P", "C", "S", "A", "J", "R", "I", "X"];

		c_rotor[1] = new Array(27);
		c_rotor[1] = [" ", "O", "V", "Z", "N", "D", "T", "K", "A", "Q", "L", "C", "J", "R", "W", "Y", "M", "P", "X", "I", "B", "G", "H", "F", "U", "E", "S"];

		c_rotor[2] = new Array(27);
		c_rotor[2] = ["M", "C", "K", "E", "U", "V", "N", "I", "T", "H", "P", "Z", "X", "Y", "F", "O", "Q", " ", "S", "A", "G", "J", "L", "B", "D", "W", "R"];

		c_rotor[3] = new Array(27);
		c_rotor[3] = ["E", "I", "W", "B", "P", "S", "T", "J", "C", "V", "O", "G", "K", "Z", "H", "F", "N", "L", " ", "M", "D", "R", "Y", "X", "Q", "A", "U"];

		c_rotor[4] = new Array(27);
		c_rotor[4] = ["J", "V", "U", "E", "Y", "O", "G", "I", "D", " ", "Q", "Z", "K", "H", "T", "R", "P", "X", "A", "W", "S", "B", "N", "M", "C", "L", "F"];

		// Passa a referencia do array as raviáveis dos três Rotores.
		rotor1 = c_rotor[setRotor1];
		rotor2 = c_rotor[setRotor2];
		rotor3 = c_rotor[setRotor3];
	}

	this.posicaoInicial = function (setPosicao1, setPosicao2, setPosicao3) {
		/*
		* Método que seta as posições iniciais dos três Rotores
		*/

		posicaoRotor1 = parseInt(setPosicao1);
		posicaoRotor2 = parseInt(setPosicao2);
		posicaoRotor3 = parseInt(setPosicao3);

		this.historicoRotores.slice(0, 0);
		this.historicoRotores.push([posicaoRotor1, posicaoRotor2, posicaoRotor3]);
	}

	this.setPlug = function (letraEntrada, letraSaida) {
		/*
		* Esse método adiciona Plugs ao Objeto. O sistema usa dois arrays e o fato de que o índice das entradas dos Plugs
		* é a mesma nos dois arrays.
		*/
		if (letraEntrada == letraSaida) {
			// Reset dos Plugs acontece quando duas entradas idênticas são enviadas ao métodos. É mais fácil redefinir todos os Plugs sempre que uma 
			// tentativa de alteração for feita.
			plugEntrada = [];
			plugSaida = [];
		} else {
			plugEntrada.push(letraEntrada);
			plugSaida.push(letraSaida);

			plugEntrada.push(letraSaida);
			plugSaida.push(letraEntrada);
		}
	}

	this.criptografar = function (letra) {
		var letra;
		var indiceAuxiliar;

		letra = formataLetra(letra);

		// Caracteres e funções não criptografadas
		if (caracteresPermitidos.indexOf(letra) == -1) {
			this.movimentaRotores(0);

			return letra;
		} else {
			// Passa pelos plugs
			if (plugEntrada.indexOf(letra) != -1) {
				letra = plugSaida[plugEntrada.indexOf(letra)];
			}

			// Acha posição no Rotor 1
			indiceAuxiliar = parseInt(rotor1.indexOf(letra));
			if (indiceAuxiliar > posicaoRotor1) {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor1 + posicaoRotor2) % 27;
			} else {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor1 + posicaoRotor2 + 27) % 27;
			}

			if (indiceAuxiliar > posicaoRotor2) {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor2 + posicaoRotor3) % 27;
			} else {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor2 + posicaoRotor3 + 27) % 27;
			}

			letra = rotor3[indiceAuxiliar];

			// Passa novamente pelos Plugs
			if (plugEntrada.indexOf(letra) != -1) {
				letra = plugSaida[plugEntrada.indexOf(letra)];
			}

			// Movimenta Rotores
			this.movimentaRotores(1);

			return letra;
		}
	}

	this.descriptografar = function (letra) {
		var letra;
		var indiceAuxiliar;

		letra = formataLetra(letra);

		// Caracteres e funções não criptografadas
		if (caracteresPermitidos.indexOf(letra) == -1) {
			this.movimentaRotores(0);

			return letra;
		} else {
			// Passa pelos plugs
			if (plugEntrada.indexOf(letra) != -1) {
				letra = plugSaida[plugEntrada.indexOf(letra)];
			}

			// Acha posição no Rotor 3
			indiceAuxiliar = parseInt(rotor3.indexOf(letra));
			if (indiceAuxiliar > posicaoRotor3) {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor3 + posicaoRotor2) % 27;
			} else {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor3 + posicaoRotor2 + 27) % 27;
			}

			if (indiceAuxiliar > posicaoRotor2) {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor2 + posicaoRotor1) % 27;
			} else {
				indiceAuxiliar = (indiceAuxiliar - posicaoRotor2 + posicaoRotor1 + 27) % 27;
			}

			letra = rotor1[indiceAuxiliar];

			// Passa novamente pelos Plugs
			if (plugEntrada.indexOf(letra) != -1) {
				letra = plugSaida[plugEntrada.indexOf(letra)];
			}

			// Movimenta Rotores
			this.movimentaRotores(1);

			return letra;
		}
	}

	this.movimentaRotores = function (giro) {
		var passoRotor1;
		var giro;
		var mmc;

		switch (giro) {
			case -1:
				if (this.historicoRotores.length > 1) {
					// Deleta a última configuração
					this.historicoRotores.pop();

					// Redefine posição dos rotores
					posicaoRotor1 = this.historicoRotores[this.historicoRotores.length - 1][0];
					posicaoRotor2 = this.historicoRotores[this.historicoRotores.length - 1][1];
					posicaoRotor3 = this.historicoRotores[this.historicoRotores.length - 1][2];
				}

				break;

			case 0:
				// Vai ser usado quando uma tecla sem efeito for clicada
				this.historicoRotores.push([null, null, null]);

				break;

			case 1:
				// Verifica se há necessidade do cálculo do MMC, pois o MMC não pode ser superior ao produto das 3 posições
				if (posicaoRotor1 * posicaoRotor2 * posicaoRotor3 > 1000) {
					mmc = calculaMMC([posicaoRotor1, posicaoRotor2, posicaoRotor3]);
				} else {
					mmc = 0;
				}


				if (mmc > 1000) {
					passoRotor1 = 3;
				} else {
					if (posicaoRotor2 % 2 == 0) {
						// Caso em que a posição do Rotor 1 é par
						if ((posicaoRotor1 > 3 && posicaoRotor1 % 2 === 0 && posicaoRotor1 % 3 === 0) || ehPrimo(posicaoRotor1)) {
							passoRotor1 = 2;
						} else {
							passoRotor1 = 1;
						}
					} else {
						// Caso em que a posição do Rotor 1 é ímpar
						if ((posicaoRotor1 > 3 && posicaoRotor1 % 2 === 0 && posicaoRotor1 % 3 === 0) || ehPrimo(posicaoRotor1)) {
							passoRotor1 = 1;
						} else {
							passoRotor1 = 2;
						}
					}
				}

				// Agora que sabemos o passoRotor1, podemos calcular os overflows
				if (posicaoRotor1 + passoRotor1 < rotor1.length) {
					posicaoRotor1 += passoRotor1;
				} else {
					posicaoRotor1 = posicaoRotor1 + passoRotor1 - rotor1.length;
					if (posicaoRotor2 + 1 < rotor2.length) {
						posicaoRotor2 += 1;
					} else {
						posicaoRotor2 = 0;
						if (posicaoRotor3 + 1 < rotor3.length) {
							posicaoRotor3 += 1;
						} else {
							posicaoRotor3 = 0;
							if (posicaoRotor1 + 1 < rotor1.length) {
								posicaoRotor1 += 1;
							} else {
								posicaoRotor1 = 0;
								if (posicaoRotor2 + 1 < rotor2.length) {
									posicaoRotor2 += 1;
								} else {
									posicaoRotor2 = 0;
									posicaoRotor3 += 1;
								}
							}
						}
					}
				}
				// Adiciona configuração ao histórico
				this.historicoRotores.push([posicaoRotor1, posicaoRotor2, posicaoRotor3]);

				break;
		}
	}

	calculaMMC = function (numeros) {
		var numeros;
		var numero2;
		var mmc;

		numero2 = numeros[0];
		for (j = 1; j < numeros.length; j += 1) {
			mmc = numeros[j] * numero2;
			for (var i = 1; i < numero2; i++) {
				if (i * numeros[j] % numeros[j] == 0 && i * numeros[j] % numero2 == 0 && i * numeros[j] < mmc) {
					mmc = i * numeros[j];
				}
			}
			numero2 = mmc;
		}
		return mmc;
	}

	ehPrimo = function (numero) {
		var numero;
		var passo = 3;

		if (numero <= 1 || (numero != 2 && numero % 2 == 0)) {
			return false;
		}

		while (passo <= numero / 2) {
			if (numero % passo == 0) {
				return false;
			}
			passo += 2;		/* testamos so' os  impares: 3, 5, 7... */
		}

		return true;
	}

	formataLetra = function (letra) {
		var letra;
		letra = letra.replace(/[áàãâä]/i, "A");
		letra = letra.replace(/[éèêë]/i, "E");
		letra = letra.replace(/[íìîï]/i, "I");
		letra = letra.replace(/[óòõôö]/i, "O");
		letra = letra.replace(/[úùûü]/i, "U");
		letra = letra.replace(/[ç]/i, "C");

		letra = letra.toUpperCase();
		return letra;
	}
}