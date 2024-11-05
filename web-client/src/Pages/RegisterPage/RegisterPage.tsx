import { useEffect } from 'preact/hooks';
import './registerpage.css'
import { Auth, UserData } from '../../Models/Authentication';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const authenticationModel = new Auth();

    useEffect(() => {
        const form = document.getElementById("register-form") as HTMLFormElement;

        if (form){
            form.addEventListener('submit', (event: Event) => {
                event.preventDefault();
                const formData = new FormData(form);

                const userData: UserData = {
                    username: formData.get("username")?.toString() || "",
                    name: formData.get("name")?.toString() || "",
                    lastname: formData.get("lastname")?.toString() || "",
                    email: formData.get("email")?.toString() || "",
                    password: formData.get("password")?.toString() || "",
                }

                authenticationModel.register(userData).then(value => {
                    if (value) {
                        toast.success("Usuario registrado con éxito")
                    } else {
                        toast.error("Error al registrar usuario, vuelve a intentarlo")
                    }
                })

            })
        }

    }, [])

    return (
        <div className="page-content">
            <div className="form">
                <h1 className="ag-cita-title page-title">Registro de usuarios</h1>
                <div className="form-container-login">
                    <form className="login-form" id="register-form">
                        <div className="form-group last-group">
                            <input type="text"  name="username" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>

                        <div className="form-row">
                            <div className="form-group last-group">
                                <input type="text" name="name" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1"></input>
                            </div>
                            <div className="form-group last-group">
                                <input type="text"  name="lastname" className="form-control" placeholder="Lastname" aria-label="LastName" aria-describedby="basic-addon1"></input>
                            </div>
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text"  name="email" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="form-group last-group">
                            <input type="text" name="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="form-group last-group">
                            <input type="text" className="form-control" placeholder="Confirm your password" aria-label="Password" aria-describedby="basic-addon1"></input>
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

export default RegisterPage;