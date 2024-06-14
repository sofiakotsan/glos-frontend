import React from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"; 
import { NavLink } from 'react-router-dom';

function FeaturesPage(){
    const domain = "glos-frontend";

    const features = [
        {id: 1, iconClass: 'bi bi-check-circle', title: 'Доступ до даних 24/7', text: 'Повноцінна робота вашої команди з будь-якої частини світу  .'},
        {id: 2, iconClass: 'bi bi-database-lock', title: 'Захист облікових даних та інформації', text: 'Весь код і модулі захисту написані виключно спеціалістами проєкту "Glos".'},
        {id: 3, iconClass: 'bi bi-rocket-takeoff', title: 'Стабільна робота на різних пристроях', text: 'Повноцінна підтримка ноутбуків, планшетів, телефонів.'},
        {id: 4, iconClass: 'bi bi-graph-up-arrow', title: 'Адмін контроль', text: 'Широкі можливості по контролю за доступом до ваших файлів.'},
    ];

return(
        <div>           
            <section className='section cta-section'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
                            <h1 className="display-4"><strong>Час покращувати своє майбутнє, вже сьогодні!</strong></h1><br></br>
                            <h3>Надійність сервісу базується на використанні мікросервісної архітектури та <br></br>розташування головних модулів на різних серверах</h3><br></br>
                           
                            <p className="h5"><strong>Спеціалістами команди "GLOS" використані передові методи та найкращі інструменти при створенні продукту.</strong></p>
                            <p className="h5"><strong>Використай ВСІ ПЕРЕВАГИ сервісів "GLOS" для зміцнення та покращення становища на ринку.</strong></p>
                            <p className="h5"><strong>Ми вирізняємось свіжим поглядом на проблему зберігання даних клієнтів.</strong></p>

                        </div>
                    </div>
                </div>
            </section>
           
           
            <div className="container text-center">
                <div className="row gx-5">
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Доступ до даних 24/7</h5>
                            <p className="card-text">Повноцінна робота вашої команди з будь-якої частини світу. Розвивай свій бізнес з нами. Від фрілансу і стартапів до повцінного інформаційного продукту, GLOS - це найкращій онлайн інструмент для зростання бізнесу і команди. </p>
                            
                            </div>
                        </div>  
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Захист облікових даних та інформації</h5>
                            <p className="card-text">Весь код і модулі захисту написані виключно спеціалістами проєкту "Glos". Для передачі даних використвується сучасний протокол HTTPS</p>
                            
                            </div>
                        </div>  
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Стабільна робота на різних пристроях</h5>
                            <p className="card-text">Повноцінна підтримка ноутбуків, планшетів, телефонів. Працюй з планшетом бітльш продуктивно. Всі елементи керування та сторінки спеціально адаптовано для максимально зручного досвіду праці з сервісом</p>
                           
                            </div>
                        </div>  
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Зберігай та надавай доступ до своїх даних з будь якої точки світу</h5>
                            <p className="card-text">Зберігай свої файли в одному безпечному місці з доступом з комп'ютера, планшета та телефона. Створюй резервну копію важливих даних і отримай захист при форс мажорі.</p>
                            
                            </div>
                        </div>  
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Надавай потрібним користувачам  необхідний рівень доступу. </h5>
                            <p className="card-text">Згідно запропонованого механізму тегів. Обирай різні рівні доступу для кожного файлу або репозиторію в цілому.</p>
                            
                            </div>
                        </div>  
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="card rounded-5 p-3 text-center accent-bg">
                            <Logo className="logo mx-auto my-2 p-2 bg-light border rounded-circle" style={{height:200, width:200}}/>
                            <div className="card-body" >
                            <h5 className="card-title">Зворотній зв'язок</h5>
                            <p className="card-text">Надсилай приватні повідомлення команді GLOS та отримуй консультацію та швидке вирішення проблем.</p>
                            
                            </div>
                        </div>  
                    </div>

                </div>
            </div>           
           
            <section className='section cta-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
                            <h1>Зроби СВІЙ крок до успіху разом з "GLOS"</h1>
                            <p>Найважчий завжди перший крок. </p>
                            <NavLink className="btn btn-primary" to={"/" + domain + "/register"}>Розпочати</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    
    );
}
export default FeaturesPage