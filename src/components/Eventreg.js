import React, { useContext, useEffect, useState } from 'react'
import Times from '../assets/Times'
import { FirebaseContext } from '../store/Contexts'
import './eventreg.css'
// import Header from './Header

function Eventreg() {
    const { firebase } = useContext(FirebaseContext)
    const [teams, setTeams] = useState([])
    // const [regNo, setRegNo] = useState(0)
    const [code, setCode] = useState([])
    const [dept, setDept] = useState('')
    const [divMap, setDivMap] = useState([2])
    const count = divMap.length

    // firebase.firestore().collection('Registration Number').doc('unique').get().then((res) => {
    //     setRegNo(res.data().number)
    // })
    useEffect(() => {

        firebase.firestore().collection('Attendee').get().then((snapshot) => {
            const alldocs = snapshot.docs.map((res) => {

                return {
                    ...res.data(),
                    id: res.id

                }
            })
            setTeams(alldocs)
        })
    }, [firebase])


    console.log(teams);

    const addItem = () => {
        if (code !== "") {
            if (dept !== "") {
                setDivMap([...divMap, count + 1])
            } else {
                alert("Please fill the item details")
            }
        } else {
            alert("Please fill the item details")
        }
    }

    return (
        <div>
            {/* <Header/> */}
            <h1 style={{ color: "black" }}>Dashboard</h1>
            <div className="dataDiv1">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Resitration number</th>
                                <th>Name</th>
                                <th>College</th>
                                <th>Phone no.</th>
                                <th>Email</th>
                                {divMap.map((div, index) => {
                                    return (
                                        <th>Event</th>)
                                })}

                                <th>add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => {
                                // console.log(team.file_Url)
                                return (<tr >

                                    <td>{team.Registration_number}</td>
                                    <td>{team.Name}</td>
                                    <td>{team.College}</td>
                                    <td>{team.Phone}</td>
                                    <td>{team.Email}</td>


                                    {divMap.map((div, index) => {
                                        return (
                                            <td><label>Dept.&nbsp;&nbsp;</label>
                                                <input style={{ backgroundColor: "#ededae" }} type="text" value={team.Dept} onChange={(e) => {
                                                    setDept(e.target.value)
                                                    firebase.firestore().collection('Attendee').doc(team.id).update({
                                                        Dept: e.target.value
                                                    })
                                                }


                                                } /><br />
                                                <label>Code&nbsp;&nbsp;</label>
                                                <input value={team.Code} style={{ backgroundColor: "#ededae" }} onChange={(e) => {
                                                    setCode(e.target.value)
                                                    firebase.firestore().collection('Attendee').doc(team.id).update({
                                                        Code: e.target.value
                                                    })
                                                }} type="number" /></td>
                                        )
                                    })}
                                    <td><p className="additem-btn" onClick={addItem} style={{ margin: "auto", width: "100%" }}><Times /></p></td>
                                </tr>)

                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Eventreg