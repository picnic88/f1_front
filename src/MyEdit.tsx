import React, { useEffect, useState } from 'react';
import H from './H.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyEdit() {
        const navigate = useNavigate();
        const role = localStorage.getItem("role");
        const loginId = localStorage.getItem("loginId");
        const [activeTab, setActiveTab] = useState("info");
    return(
        <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '20px' }}>내 정보 수정</h3>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>비밀번호 변경</label>
                <input type="password" placeholder="변경할 비밀번호 입력" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>닉네임 변경</label>
                <input type="text" placeholder="새로운 닉네임" style={inputStyle} />
            </div>
            <button onClick={() => alert("정보 수정 기능은 준비 중입니다.")} style={{ ...adminBtnStyle, width: '100%', background: '#333' }}>수정 완료</button>
        </div>
    );
}

const adminBtnStyle = { padding: '10px 20px', margin: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' };
const tabStyle = { padding: '15px 30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };