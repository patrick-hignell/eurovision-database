export default function BasicHeaderRow() {
  return (
    <tr className="flex">
      <th className="header country">
        <p>Country</p>
      </th>
      <th className="header year">
        <p>Year</p>
      </th>
      <th className="header artist">
        <p>Artist</p>
      </th>
      <th className="header song">
        <p>Song</p>
      </th>
      <th className="header language">
        <p>Language</p>
      </th>
      <th className="header position">
        <p>Position</p>
      </th>
      <th className="header points">
        <p>Points</p>
      </th>
      <th className="header costume">
        <p>Costume</p>
      </th>
      <th className="header favourite">
        <i className="bi bi-star-fill "></i>
      </th>
    </tr>
  )
}
