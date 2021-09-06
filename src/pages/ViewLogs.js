import React,{useEffect,useState} from "react"
import DataTable from "../Components/DataTable"

const ViewLogs = () => {
    const [data, setData] = useState([]);
    const  columns = [
        {
            name: 'timestamp',
            selector: 'timestamp',
            sortable: true,
        },
        {
            name: 'event',
            selector: 'event',
            sortable: true,
        },
        {
            name: 'details',
            selector: 'details',
            sortable: true,
        },
    ];

    useEffect(() => {
        fetch('view_logs.json', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(res => {
            return res.json()
          }).then(root => {
                setData(root)
              console.log(root)
          })
    }, [])

    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    );
}

export default ViewLogs;