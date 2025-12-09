import React from 'react'
import H from './H'
import './css/Home.css'
import axios from "axios";
import { useEffect, useState } from "react";
import notice from './img/notice.png';

interface Driver {
    position: number;
    name: string;
    team: string;
    points: number;
    imageUrl: string;
}
interface Team {
    position: number;
    name: string;
    points: number;
}
interface Schedule {
    round: number;
    raceName: string;
    date: string;
}
interface Props {
    drivers: Driver[];
    teams: Team[];
    schedules: Schedule[];
    recommendations?: any[];
    spotifyUrl?: string;
}


export default function Home({
    drivers = [],
    teams = [],
    schedules = [] }: Props
) {
    return (
        <div>
            <H />
            <div className='last'>
                <p className='lastText'>Home</p>
            </div>
            <div className="container mt-4">
                <div className='top1'>
                    {/* ===== Driver Standings ===== */}
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="card p-4">
                                <h3 className="mb-3">🏆 Driver Standings</h3>

                                <div style={{ height: "500px", overflowY: "auto" }}>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th className='DriverBoardDriveText'>Driver</th>
                                                <th>Team</th>
                                                <th>Pts</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {drivers.map((d, i) => (
                                                <tr key={i}>
                                                    <td>{d.position}</td>

                                                    <td className="driver-cell">
                                                        <img src={d.imageUrl} className="driver-img driver-face" alt="driver" />
                                                        <span className='name'>{d.name}</span>
                                                    </td>

                                                    <td className='team'>{d.team}</td>

                                                    <td className="fw-bold text-warning">{d.points}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ===== Constructors + Schedule ===== */}
                    <div className="row mt-4">
                        {/* Constructor Standings */}
                        <div className="col-md-7">
                            <div className="card p-5">
                                <h3 className="mb-3">🏆 Team Standings</h3>

                                <div style={{ height: "300px", overflowY: "auto" }}>
                                    <table className="table table-hover">
                                        <thead style={{ position: "sticky", top: 0 }}>
                                            <tr>
                                                <th>#</th>
                                                <th className='TeamBoardTeamText'>Team</th>
                                                <th>Pts</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {teams.map((t, i) => (
                                                <tr key={i}>
                                                    <td>{t.position}</td>
                                                    <td>{t.points}</td>
                                                    <td>{t.points}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div className="col-md-6">
                    <div className="card p-41 i">
                        <h3 className="mb-3">📅 Grand Prix</h3>

                        <div style={{ height: "300px", overflowY: "auto" }}>
                            <table className="table table-sm table-hover">
                                <thead style={{ position: "sticky", top: 0 }}>
                                    <tr>
                                        <th>Rnd</th>
                                        <th className='DriverBoardDriveText'>Grand Prix</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {schedules.map((s, i) => (
                                        <tr key={i}>
                                            <td>{s.round}</td>
                                            <td>{s.raceName}</td>
                                            <td>{s.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className='img2'>
                        <div className='photoName'>PHOTO</div>
                        <img src={notice} className="img1" />
                    </div>
                </div>

            </div>
        </div >
    )
}