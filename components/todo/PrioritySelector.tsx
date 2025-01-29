interface PrioritySelectorProps {
  priority: "low" | "medium" | "high"
  changePriority: (priority: "low" | "medium" | "high") => void
}

const PrioritySelector = ({ priority, changePriority }: PrioritySelectorProps) => {
  return (
    <select
      value={priority}
      onChange={(e) => changePriority(e.target.value as "low" | "medium" | "high")}
      className="p-2 text-xs font-semibold text-white rounded-md bg-gray-300 hover:bg-gray-400"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  )
}

export default PrioritySelector
