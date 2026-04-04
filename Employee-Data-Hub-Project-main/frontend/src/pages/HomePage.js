import React, { useEffect, useState } from "react";

import { Link,  useNavigate } from "react-router-dom";
// import { collection } from "../../Server/models/User";

//delete ke onClick pe  course._id bhej ke func call krdo
//redux mai value save kro or edit ke true flag pe formpage call kro or setValue use krke sbka value redux se nikal
// ke save kro or flag bhi rredux mai hi hona chahiye
//edit ke lite alag se ek route bhi banana padega jisme uss employee ka particular id bhi bhejna padega

const HomePage = () => {
  const navigate = useNavigate()
  const [empData, setEmpData] = useState();

  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getPeople.json();
      // console.log("res=>",res)
      await setEmpData(res);
      // console.log("ingetpeople=>",empData)
    } catch (error) {
      // console.log(error);
    }
  };

 const handleEdit = (person) =>{
    try{
        // console.log('person=>', person)
        navigate(`/editemployee/${person._id}`)
    }catch(error){
      // console.log("error occured while editing employee",error)
    }
  }
  
 
  const handleDelete = async(person) =>{
    // const userId = person._id
    // console.log('userid=>', userId)
    try{
        const result = await fetch(
          `${process.env.REACT_APP_BASE_URL}/deleteUser`,{
            method:"POST",
            headers: {
               "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
             body:JSON.stringify(person)
          }
        )
        const res = await result.json()
        // console.log("res=>",res)
        window.location.reload()
    }catch(error){
      console.log("Error occured while deleting employee=>",error)
    }
  }

  useEffect(() => {
    getAllData();
    // console.log(empData)
  },[]);

  // console.log(empData);

  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Employees
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all employees. You can add new employees, edit
              or delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Employee
              </button>
            </div>
          </Link>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Employee</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Role
                      </th>
                      <th 
                      scope="col"
                        className=" text-center py-3.5 px-4 text-sm font-normal  rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Operation
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData?.data.map((person,index) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {person.department}
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.role}
                        </td>
                        <td>
                          <div className="flex justify-evenly ">
                              <button
                               className="rounded-md bg-indigo-600 px-5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 "
                              onClick={()=>handleEdit(person)}
                              >
                                 Edit
                              </button>
                              <button
                               className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 "
                              onClick={()=>handleDelete(person)}
                              >
                                  Delete
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
