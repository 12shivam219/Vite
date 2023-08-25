import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import './FirstDataTable.css'
import DepartmentData from '../JSON/DepartmentData.json'

interface user {
    id: number;
    title: string;
    body: string;
}

interface SubDepartment {
    sub_department_name: string;
    selected: boolean;
}

interface Department {
    department: string;
    sub_departments: SubDepartment[];
    selected: boolean;
    cli: boolean;
}


export const FirstDataTable = () => {


    // [ Checked Component 2 Logics Start 

    const [departments, setDepartments] = useState<Department[]>(
        DepartmentData.map((department) => ({
            ...department,
            cli: false, 
        }))
    );

    const handleDepartmentChange = (departmentIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDepartments = [...departments];
        updatedDepartments[departmentIndex].selected = event.target.checked;

        updatedDepartments[departmentIndex].sub_departments.forEach((subDepartment) => {
            subDepartment.selected = event.target.checked;
        });

        setDepartments(updatedDepartments);
    };

    const handleSubDepartmentChange = (departmentIndex: number, subDepartmentIndex: number) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedDepartments = [...departments];
        updatedDepartments[departmentIndex].sub_departments[subDepartmentIndex].selected = event.target.checked;

        if (updatedDepartments[departmentIndex].sub_departments.every((subDep) => subDep.selected)) {
            updatedDepartments[departmentIndex].selected = true;
        } else {
            updatedDepartments[departmentIndex].selected = false;
        }

        setDepartments(updatedDepartments);
    };

    //Checked Component 2 Logics End ]

    const [userData, setUserData] = useState<user[]>([])


    //Fetch List From Api

    const Data = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //Api Call

    useEffect(() => {
        Data();
    }, [])

    // DataGrid Colums

    const columns = [
        { field: "id", headerName: "Id", width: 20, headerClassName: 'cell', cellClassName: 'cell' },
        { field: "title", headerName: "Title", width: 300, headerClassName: 'cell', cellClassName: 'cell', editable: true, },
        { field: "body", headerName: "Body", width: 350, headerClassName: 'cell', cellClassName: 'cell', editable: true, }
    ]

    // DataGrid Rows

    const rows = userData.map((row) => ({
        id: row.id,
        title: row.title,
        body: row.body

    }))

    const handleCliToggle = (departmentIndex: number) => {
        const updatedDepartments = [...departments];
        updatedDepartments[departmentIndex].cli = !updatedDepartments[departmentIndex].cli;
        setDepartments(updatedDepartments);
    };

    //Page Option For Table
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

                <div>

                    <div className="py-3">
                        <h1 className="font-mono text-center font-bold text-[32px]">Component 2</h1>
                    </div>

                    <div className="m-auto w-1/2 p-5">

                        {departments.map((department, departmentIndex) => (
                            <div key={department.department}>
                                <div className="flex items-center m-4">
                                    <span className="font-extrabold text-[23px] mr-2.5 mb-1.5 cursor-pointer" onClick={() => handleCliToggle(departmentIndex)} >{departments[departmentIndex].cli ? <>&#8722;</> : <>&#43;</>}</span>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={department.selected}
                                            className="w-[18px] mr-2.5 mt-2.5 h-[18px]"
                                            onChange={handleDepartmentChange(departmentIndex)}
                                        />

                                    </label>
                                    <h1 className="font-mono font-bold text-xl">{department.department}</h1>
                                </div>

                                <ul className={department.cli?'custmer_ul':'hidden'}>
                                    {department.sub_departments.map((subDepartment, subDepartmentIndex) => (
                                        <li key={subDepartment.sub_department_name}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={subDepartment.selected}
                                                    className="w-[18px] mr-2.5 mt-2.5 h-[18px]"
                                                    onChange={handleSubDepartmentChange(departmentIndex, subDepartmentIndex)}
                                                />
                                                <span className="font-mono font-semibold text-[16px]"> {subDepartment.sub_department_name}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}


                    </div>
                </div>


            </div>
        </>
    )
}
