import { useEffect } from 'preact/hooks';
import { Auth } from '../../Models/Authentication';
import './loginpage.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CounterState } from '../../stores/UserSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const authentication = new Auth();
    const navigate = useNavigate();
    const isAdmin = useSelector((state: CounterState) => state.isAdmin);

    useEffect(() => {
        const form = document.getElementById("login-form") as HTMLFormElement;

        if (form){
            form.addEventListener("submit", (e: Event) => {
                e.preventDefault()
    
                const formData = new FormData(form);
    
                const data = {
                    username: formData.get('username')?.toString() || '',
                    password: formData.get('password')?.toString() || '',
                };

                if(data.username && data.password) {                    
                    authentication.login(data.username, data.password).then(value => {
                        if (value){                    
                            toast.success("Usuario validado con éxito");
                            if (isAdmin) navigate("/register");
                            else navigate("/home");

                        } else {
                            toast.error("Credenciales inválidas");
                        }

                    }).catch(_err => {
                        toast.error("Ups! algo salió mal");
                    })
                } else {
                    console.log("no crendentials"); 
                }
            })
        }
    }, [])

    return (
        <div className="page-content">
            
            <div className="form">

            <h1 className="ag-cita-title page-title">Ingresa a tu cuenta</h1>
            <div className="form-container-login">
                <form className="login-form" id="login-form">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" name="username" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="form-group last-group">
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>
                    <div className="row button-container login-form-btn">
                        <button type="submit" className="btn btn-outline-dark login-button" id="submitButton" >Ingresar</button>
                    </div>
                </form>
            </div>
            </div>
            
        </div>
      );
}

export default LoginPage;