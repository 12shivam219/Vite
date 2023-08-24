import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import './FirstDataTable.css'
import Department from '../JSON/Department.json'

interface user {
    id: number;
    title: string;
    body: string;
}

// interface SubDepartment {
//     sub_department: string;
// }

interface Department {
    department: string;
    sub_departments: string[]; // Each sub-department is a string
}


export const FirstDataTable = () => {

    const [userData, setUserData] = useState<user[]>([])

    const Data = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        Data();
    }, [])

    const columns = [
        { field: "id", headerName: "Id", width: 20, headerClassName: 'cell', cellClassName: 'cell' },
        { field: "title", headerName: "Title", width: 300, headerClassName: 'cell', cellClassName: 'cell', editable: true, },
        { field: "body", headerName: "Body", width: 350, headerClassName: 'cell', cellClassName: 'cell', editable: true, }
    ]

    const rows = userData.map((row) => ({
        id: row.id,
        title: row.title,
        body: row.body

    }))

    const pageSizeOptions = [10, 20, 30, 100]

    return (
        <>
            <div>

                <div className="py-4">
                    <h1 className="font-mono text-center font-bold text-[32px]">Component 1</h1>
                </div>

                {/* //Component 1 */}

                <div className="w-1/2 h-[500px] m-auto">
                    <DataGrid rows={rows}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        rowHeight={40}
                        columnHeaderHeight={40}
                        columns={columns}
                        pageSizeOptions={pageSizeOptions}
                        pagination={true}
                        sx={{
                            border: 2,
                            boxShadow: 2,
                            textAlign: "center"
                        }}
                    />
                </div>

                {/* //Component 2 */}

                <div>
                    <div className="m-auto w-1/2 p-5">
                        {Department.map((dept: Department) => (
                            <ul key={dept.department} className="my-2">
                                <div className="flex items-center"><input type="checkbox" className="w-[20px] mr-2.5 h-[20px]"/><h1 className="font-mono font-bold text-xl">{dept.department}</h1></div>
                                    {dept.sub_departments.map((subDept: string) => (
                                        <li key={subDept} className="ml-7 flex items-center"><input type="checkbox" className="w-[15px] mr-2.5 h-[15px]"/><span className="font-mono font-semibold text-[16px]">{subDept}</span></li>
                                    ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
