export const TaskRow = ({ task, toggleTask }) => (
  <tr key={task.name}>
    <td className="d-flex justify-content-between">
      <div>
        <div>{task.name}</div>
        <div className="text-muted">{task.description}</div>
      </div>
      <div>
        <div>{task.date}</div> {/* Mostramos la fecha de la tarea */}
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task)}
        />
      </div>
    </td>
  </tr>
);
