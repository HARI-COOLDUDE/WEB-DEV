import React from "react";

function Predict() {
    const RSVP = async (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        var paramsjson = {
            email: inputs.email,
            password: inputs.pass
        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: params

                }
            )
            const data = await res.json()
            if (data.success == true) {
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("token", data.token);
              }
            else {
                setShowError(true);
                setError("Invalid Credentials")
            }
        }
        catch (error) {
            console.log("Error ", error);
            setShowError(true);
            setError("Failed to connect with server");
        }
    }
    const Email = async(event) => {
        event.preventDefault();
        if(inputs2.otp == otp){
                const data = await res.json();
                if (data.success == true) {
                    setError("RSVP MAIL SENT")
                    setShowError(true);
                }
                else {
                  
                    setError("UNABLE TO SEND RSVP MAIL")
                    setShowError(true);
                }
    
            }

    const [inputs, setInputs] = useState({})
    const [inputs1, setInputs1] = useState({})
    const [inputs2, setInputs2] = useState({})
    const [showerror, setShowError] = useState(false)
    const [error, setError] = useState("")
    const [otp, setOTP] = useState("")

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
    const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs2(values => ({ ...values, [name]: value }))
    }
    const openModal3 = () => {

        var modal2 = document.getElementById("forgetModal");
        console.log("CC")
        modal2.style.display = "block";
    }
    const closeModal3 = (event) => {


        var modal2 = document.getElementById("forgetModal");
        modal2.style.display = "none";
    }
    const openModal4 = () => {

        var modal4 = document.getElementById("forgetModal1");
        console.log("CC")
        modal4.style.display = "block";
    }
    const closeModal4 = (event) => {
        var modal4 = document.getElementById("forgetModal1");
        modal4.style.display = "none";
    }
    const forgetEmail = async (event) => {
        event.preventDefault();
        console.log("Clicked", inputs1);
        var paramsjson = {
            email: inputs1.fmail,
        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "auth/email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: params

                }
            )
            const data = await res.json();
            if (data.success == true) {
                setOTP(data.otp);
                closeModal3();
                openModal4();
            }
            else {
                closeModal3();
                setError("Unable to send Email")
                setShowError(true);
            }

        }
        catch (error) {
            console.log("Error ", error);
            closeModal3();
            setShowError(true);
            setError("Failed to connect with server");
        }


    }

  return (
    <div>
      <div class="leftcontainer">
        <p>Use the given Qr for Prediction of the Loan</p>
        <button onClick={RSVP}>Collateral</button>
        <p>RSVP mail sent to registered email address</p>
      </div>
    </div>
  );
}
}


export default Predict;
