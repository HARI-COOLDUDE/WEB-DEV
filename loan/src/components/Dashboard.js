import React, { useState, useEffect } from 'react'
import img1 from '../asset/img/cart.jpg'
import del from '../asset/img/delete.svg'
import edit from '../asset/img/edit.png'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api.json'
function Dashboard() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const [inputs1, setInputs1] = useState({})
    const [showdata, setShowData] = useState(false)
    const [LoanDetails,setLoanDetails] = useState(null)
    const [showerror, setShowError] = useState(false)
    const [error, setError] = useState("")
    const [id, setID] = useState("")
    const [reload, setReload] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(api.baseurl + "record/get?email=" + localStorage.getItem("email"),
                    {
                        headers: {
                            "token": localStorage.getItem("token"),
                        },
                    }
                )
                const data = await res.json()
                console.log("Data ", data);
            
                if(data.count>0){
                    setShowData(true);
                    setLoanDetails(await(data.details));
                    console.log("Details ",LoanDetails)
                    var sum = await data.LoanAmount.reduce((a,v) =>  a = a + v.amount , 0 )
                    console.log("SUM",sum)
                    setTotal(sum);
                }
                else{
                    setShowData(false);
                }
            }
            catch (error) {
                console.log("Error ", error);
            }
        })();
    }, [showdata,reload])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs1(values => ({ ...values, [name]: value }))
    }


    const openModal1 = (val) => {

        var modal1 = document.getElementById("myModal");
        setID(val);
        console.log("AA", val)
        modal1.style.display = "block";
    }
    const closeModal1 = () => {

        var modal1 = document.getElementById("myModal");
        console.log("BB")
        modal1.style.display = "none";
    }
    const openModal2 = (val,Loan_Type,Amount,aadhar,Pan,annual_income,Tenure,date) => {
       setID(val);
        const updatedDetails ={Loan_type1:Loan_Type,Amount1:Amount,aadhar1:aadhar,Pan1:Pan,annual_income1:annual_income,Tenure1:Tenure,date1:date.substring(0,10) }
       
        setInputs1(updatedDetails)

        var modal2 = document.getElementById("myModal2");
        console.log("CC")
        modal2.style.display = "block";
    }
    const closeModal2 = (event) => {


        var modal2 = document.getElementById("myModal2");
        console.log("DD")
        modal2.style.display = "none";
    }

    const deleteDetails = async() => {
        try {
            const res = await fetch(api.baseurl + "record/remove?id=" + id,
                {
                    method:'DELETE',
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                }
            )
            const data = await res.json()
            console.log("Data ", data);
            setReload(!reload)
           
            
            
        }
        catch (error) {
            console.log("Error ", error);
        }
        

        closeModal1()
    }
    const editDeatils = async(event) => {
        event.preventDefault();
        var paramsjson = {
            Loan_type1: inputs.Loan_type1,
            Amount1: inputs.Amount1,
            aadhar1: inputs.aadhar1,
            Pan1: inputs.Pan1,
            annual_income1: inputs.annual_income1,
            Tenure1: inputs.Tenure1,
            date1: inputs.date1,

        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "record/update?id="+id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token")
                    },
                    body: params
                }
            )
            const data = await res.json();
            if (data.success == true) {
                setReload(!reload)
                alert("Details Updated")
            
            }
            else {
                alert("unable to update Details")
            }

        }
        catch (error) {
            console.log("Error ", error);
           alert("server error")
        }

        closeModal2()
    }
    const addLoanDetails = async (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        var paramsjson = {
            Loan_type: inputs.Loan_type,
            Amount: inputs.Amount,
            aadhar: inputs.aadhar,
            Pan: inputs.Pan,
            annual_income: inputs.annual_income,
            Tenure: inputs.Tenure,
            date: inputs.date,
            email: localStorage.getItem("email"),

        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "record/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token")
                    },
                    body: params
                }
            )
            const data = await res.json();
            if (data.success == true) {
                setError("Details Added Successfully")
                setInputs({})
                setShowError(true);
                setReload(!reload)
            }
            else {
                setError("Unable to add Details")
                setShowError(true);
            }

        }
        catch (error) {
            console.log("Error ", error);
            setShowError(true);
            setError("Failed to connect with server");
        }
        setShowData(true)
    }
    return (
        <div className='container'>

            {showdata ?
                <div className='leftcontainer'>
                    <p> : {total}</p>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <p>Do you want to delete this Details?</p>
                            <button onClick={deleteDetails}>Yes</button>
                            <button onClick={closeModal1}>No</button>
                        </div>
                    </div>
                    <div id="myModal2" className="modal2">

                        <div className='formcard'>
                            <div>
                                <h2 style={{ alignSelf: 'center' }}>Edit Details</h2>
                            </div>
                            <form onSubmit={editDeatils}>
                                <div>
                                    <label>
                                        Type Of Loan
                                    </label>
                                    <select
                                        value={inputs1.type1 || ''}
                                        onChange={handleChange1}
                                        name='Loan_type1'
                                        required

                                    >
                                        <option disabled value=''>Please Select Loan Type</option>
                                        <option value="personal">Personal Loan</option>
                                        <option value="education">Education Loan</option>
                                        <option value="medical">Medical Loan</option>
                                        <option value="home">Home Loan</option>
                                        <option value="vehicle">Vehicle Loan</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Amount
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder='Enter your Loan amount'
                                        value={inputs1.Amount1 || ''}
                                        onChange={handleChange1}
                                        name='Amount1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Aadhar
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your Aadhar Number'
                                        value={inputs1.title1 || ''}
                                        onChange={handleChange1}
                                        name='aadhar1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        PAN Number
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your PAN Number'
                                        value={inputs1.title1 || ''}
                                        onChange={handleChange1}
                                        name='Pan1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Annual Income
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your Annual Income'
                                        value={inputs1.title1 || ''}
                                        onChange={handleChange1}
                                        name='annual_income1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Tenure
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your Loan Tenure'
                                        value={inputs1.title1 || ''}
                                        onChange={handleChange1}
                                        name='Tenure1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Date of Applying
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        placeholder='Enter Date'
                                        value={inputs1.date1 || ''}
                                        onChange={handleChange1}
                                        name='date1'

                                    />
                                </div>


                                <div>
                                    <button>Edit Details</button>
                                </div>
                               

                            </form>
                            <div>
                                    <button onClick={closeModal2}>Cancel</button>
                                </div>
                        </div>

                    </div>
                    <div style={{ backgroundColor: 'lightgray', width: '100%', overflowY: 'scroll', marginBottom: '50px', justifyContent: 'center', justifyItems: 'center', padding: '20px' }}>
                        {LoanDetails && LoanDetails.map((val) =>
                            <div className='expenseCard' key={val._id}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <img onClick={()=>{openModal2(val._id,val.title,val.amount,val.date,val.type)}} style={{ width: '30px', height: '30px' }} src={edit} />
                                    <img onClick={() => { openModal1(val._id) }} style={{ width: '20px', height: '20px', marginLeft: '4px' }} src={del} />
                                </div>
                                <p>Loan_Type : {val.Loan_type}</p>
                                <p>Amount : {val.LoanAmount}</p>
                                <p>Aadhar : {val.aadhar}</p>
                                <p>PAN : {val.Pan}</p>
                                <p>Annual_Income : {val.annual_income}</p>
                                <p>Tenure : {val.Tenure}</p>
                                <p>Date: {val.date.substring(0,10)}</p>
                            </div>
                        )}
                    </div>
                </div>
                :
                <div className='leftcontainer'>
                    <p>Please Verify your Entered Details</p>
                    <img src={img1} />
                </div>
            }

            <div className='rightcontainer'>
                <div className='formcard'>
                    <div>
                        <h2 style={{ alignSelf: 'center' }}>Add Details</h2>
                    </div>
                    <form onSubmit={addLoanDetails}>
                    <div>
                                    <label>
                                        Type Of Loan
                                    </label>
                                    <select
                                        value={inputs.Loan_type || ''}
                                        onChange={handleChange}
                                        name='Loan_type'
                                        required

                                    >
                                        <option disabled value=''>Please Select Loan Type</option>
                                        <option value="personal">Personal Loan</option>
                                        <option value="education">Education Loan</option>
                                        <option value="medical">Medical Loan</option>
                                        <option value="home">Home Loan</option>
                                        <option value="vehicle">Vehicle Loan</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Amount
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder='Enter your Loan amount'
                                        value={inputs.Amount || ''}
                                        onChange={handleChange}
                                        name='Amount'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Aadhar
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder='Enter your Aadhar Number'
                                        value={inputs.aadhar || ''}
                                        onChange={handleChange}
                                        name='aadhar'

                                    />
                                </div>
                                <div>
                                    <label>
                                        PAN Number
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your PAN Number'
                                        value={inputs.Pan || ''}
                                        onChange={handleChange}
                                        name='Pan'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Annual Income
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder='Enter your Annual Income'
                                        value={inputs.annual_income || ''}
                                        onChange={handleChange}
                                        name='annual_income'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Tenure (in years)
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your Loan Tenure'
                                        value={inputs.Tenure || ''}
                                        onChange={handleChange}
                                        name='Tenure'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Date of Applying
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        placeholder='Enter Date'
                                        value={inputs.date || ''}
                                        onChange={handleChange}
                                        name='date'

                                    />
                                </div>
                        {
                            showerror ?
                                <div>
                                    <span style={{ color: 'red', alignSelf: 'center' }}>{error}</span>
                                </div> : null
                        }
                        <div>
                            <button>Add</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
