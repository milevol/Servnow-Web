// 목적: 회원가입 화면 속 회원가입 버튼 시 작동할 화면 구현
// 기능: 사용자 정보 입력
// 2024.07.21/곤/장고은

import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 1225px;
  font-size: 17px;
  margin-left: 35px;

  .checkBtn {
    color: white;
    background-color: #3e77ff;
    border: none;
    padding: 5px 20px;
    margin-left: 10px;
  }

  .femaleBtn,
  .maleBtn {
    background-color: #fff;
    border: 0.5px solid #d9d9d9;
  }

  input {
    height: 30px;
    width: 900px;
    border: 0.5px solid #d9d9d9;
  }

  table {
    width: 100%;
    border-collapse: separate;
  }

  td {
    padding: 20px 50px 10px 0px;
    vertical-align: middle;
  }

  button {
    border-radius: 5px;
    cursor: pointer;
  }
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  &.add td {
    padding-right: 100px;
  }

  &.add button {
    height: 30px;
    width: 445px;
    margin-right: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .back {
    background-color: #d9d9d9;
  }

  .signup {
    color: white;
    background-color: #3e77ff;
  }

  button {
    width: 220px;
    padding: 10px;
    border: none;
    border-radius: 50px;
  }
`;

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    nickname: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleGenderSelect = (gender) => {
    setForm({
      ...form,
      gender,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormSection className="basic">
          <h1>기본정보</h1>
          <table>
            <tr>
              <td htmlFor="username">아이디*</td>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <button className="checkBtn">중복확인</button>
              </td>
            </tr>
            <tr>
              <td htmlFor="password">비밀번호*</td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td htmlFor="confirmPassword">비밀번호 재확인*</td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td htmlFor="email">이메일*</td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <button className="checkBtn">본인인증</button>
              </td>
            </tr>
            <tr>
              <td htmlFor="verificationCode">인증번호</td>
              <td>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={form.verificationCode}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </table>
        </FormSection>

        <hr style={{ margin: "20px 0" }} />

        <FormSection className="add">
          <h1>추가정보</h1>
          <table>
            <tr>
              <td htmlFor="nickname">닉네임</td>
              <td>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td htmlFor="gender">성별</td>
              <td>
                <button
                  className="femaleBtn"
                  selected={form.gender === "Female"}
                  onClick={() => handleGenderSelect("Female")}
                >
                  여자
                </button>
                <button
                  className="maleBtn"
                  selected={form.gender === "Male"}
                  onClick={() => handleGenderSelect("Male")}
                >
                  남자
                </button>
              </td>
            </tr>
            <tr>
              <td htmlFor="birthDate">생년월일</td>
              <td>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </table>
        </FormSection>
        <ButtonContainer>
          <button className="back">이전</button>
          <button className="signup" type="submit">
            회원가입
          </button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default SignUp;
