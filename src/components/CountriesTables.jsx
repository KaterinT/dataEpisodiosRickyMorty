import React from 'react'
import DataTable from 'react-data-table-component'
// import Export from 'react-data-table-component'
import { useEffect, useState } from 'react';
// import { CSVDownload} from "react-csv";
import getEpisodios from '../constante/episodios.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function EpisodesTables() {
  const [search, setSearch] = useState("")
  const [episodes, setEpisodes] = useState([])
  const [filterTimeDiponible, setFilterTimeDiponible] = useState([]);
  // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

  const episodesForTimeDisponible = episodes.map((episode) => (
    
    {...episode,timeDisponible :(episode.air_date.split(",")[1])-(episode.created.split("-")[0])}
  )) 
  console.log(episodesForTimeDisponible);
  const columns = [
    {
      name:'Name',
      selector: (row) => row.name,
      sortable:true
    },
    {
      name:'Episode',
      selector: (row) => row.episode,
      sortable:true
    },
    {
      name:'Air Date',
      selector: (row) => row.air_date,
      sortable:true
    },
    {
      name:'Created',
      selector: (row) => row.created,
      sortable:true
    },
    {
      name:'Tiempo Disponible',
      selector: (row) => row.timeDisponible,
      sortable:true
    }
  ]

  useEffect(() => {
    getEpisodios().then((data) => {
      setEpisodes(data.results)
      const result = data.results.map((episode) => (
    
        {...episode,timeDisponible :(episode.air_date.split(",")[1])-(episode.created.split("-")[0])}
      )) 
      setFilterTimeDiponible(result)
      console.log(result)
      // setFilterTimeDiponible(data.results)
    })
  },[])
  
  useEffect(() => {
    const result =  episodesForTimeDisponible.filter(episode => {
      return ((episode.timeDisponible).toString().toLowerCase().match(search.toString().toLowerCase()))
    })
    setFilterTimeDiponible(result)
  },[search]);

  return <DataTable 
    title='Api List' 
    columns={columns} 
    data={filterTimeDiponible} 
    fisedHeader
    pagination
    paginationRowsPerPageOptions= {[10,20, 50]}
    fixedHeader
    fixedHeaderScrollHeight="430px"
    subHeader
    subHeaderComponent={
    <>
      <input 
      type="text" 
      placeholder='Buscar'
      className='w-25 form-control'
      value={search}
      onChange={(e) => setSearch(e.target.value)}/>
    </>
    }
    conditionalRowStyles
  />
}

export default EpisodesTables