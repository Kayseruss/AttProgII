import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react' // Importação do 'gancho'
//import './App.css'

//Função Principal
export default function App () {
  const [input, setInput] = useState("");
  const [ tarefas, setTarefas ] = useState<String[]>([]) // Por padrão deixa vazio
  const [ editarTarefa, setEditarTarefa ] = useState({ 
    enabled: false,
    tarefa: ''
  })
  const inputRef = useRef  <HTMLInputElement>(null);
  const primeiraR = useRef(true)


  useEffect(() => {
    const tarefaSalva = localStorage.getItem("@cursoreact")
    if (tarefaSalva) { // Verifica as tarefas que ainda estão salvas, para retornar na tela
      setTarefas(JSON.parse(tarefaSalva));
    }
  }, [])

  useEffect( () => {
    if (primeiraR.current) { // Verifica se é a primeira renderização
      primeiraR.current=false;
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify ( tarefas ))
    //console.log("useEffect chamado!!")
  }, [tarefas])

  const registrar = useCallback ( () => {
    if (!input) {
      alert("Preencha o nome da sua tarefa!")
      return
    }
    if(editarTarefa.enabled){ //Se estiver 'true', ou seja, se ela estiver ativa
      editarTarefaSalva(); // Chama a função 'editarTarefaSalva'
      return
    }

    setTarefas(tarefas => [...tarefas,input])
    setInput("");
  }, [ input, tarefas ])

  function editarTarefaSalva () { // Função para editar uma tarefa selecionada
    const findIndexTarefa = tarefas.findIndex(tarefas => tarefas === editarTarefa.tarefa) /*Procura o 
    index daquela tarefa | Se a tarefa que eu quero editar, for uma da lista*/
    // =====================================================================
    const todasTarefas = [...tarefas];
    todasTarefas[findIndexTarefa] = input // Procura a que deve ser alterada e altera dentro do 'input'
    setTarefas(todasTarefas); // Mostra todas as tarefas
    setEditarTarefa ({ // Deixa inativo
      enabled: false, // Seta para falso, para não editar a mesma tarefa
      tarefa: ''
    })
    setInput("")
  }

  function excluir ( item: String ) {
    const excluirTarefa = tarefas.filter(tarefas => tarefas !== item) //Filtra todas as tarefas | Pega as tarefas que são != da que você selecionou
    setTarefas(excluirTarefa)

  }

  function editar ( item: String ) {
    inputRef.current?.focus(); // Quando clicar em editar, ele já vai com o cursor para dentro do input
    setInput(item)
    setEditarTarefa({
      enabled: true, // Altera para true, para poder editar
      tarefa: item
    })
  }

  const totalTarefas = useMemo(() => { // Para retornar o total de tarefas
    return tarefas.length
  }, [tarefas])

  //------------------------------------------------------------------------
  ?
}

