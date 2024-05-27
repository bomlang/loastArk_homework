import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

export function CheckTable() {
  return (
    <TableContainer>
      <Table />
      <caption>로스트아크 숙제체크</caption>
      <colgroup></colgroup>

      <thead>
        <tr>
          {/* 클래스를 이미지로 나눌지 정해야함. */}
          <th>닉네임</th>
          <th>클래스</th>
          <th>Lv.</th>
          <th>발탄</th>
          <th>비아키스</th>
          <th>쿠크세이튼</th>
          <th>아브렐슈드</th>
          <th>카양겔</th>
          <th>일리아칸</th>
          <th>상아탑</th>
          <th>카멘</th>
          <th>에키드나</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>기상술사하러왔어</span>
          </td>
          <td>
            <figure>
              <img src="" alt="" />
              <figcaption>{"기상술사"}</figcaption>
            </figure>
          </td>
          <td>
            <span>{1520}</span>
          </td>
          <td className="valtan">
            <input type="checkBox" />
          </td>
          <td className="biackiss">
            <input type="checkBox" />
          </td>
          <td className="kouku_saton">
            <input type="checkBox" />
          </td>
          <td className="abrelshud">
            <input type="checkBox" />
          </td>
          <td className="kayangel">
            <input type="checkBox" />
          </td>
          <td className="illiakan">
            <input type="checkBox" />
          </td>
          <td className="ivory_tower flex justify-center">
            <input type="checkBox" />
          </td>
          <td className="kamen items-center">
            <input type="checkBox" />
          </td>
          <td className="echidna">
            <div className="flex justify-center items">
              <input type="checkBox" />
            </div>
          </td>
        </tr>
      </tbody>
    </TableContainer>
  );
}
