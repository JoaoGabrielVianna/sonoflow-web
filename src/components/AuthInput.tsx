export const AuthInput: React.FC<{ type: string; placeholder: string; icon: JSX.Element; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ type, placeholder, icon, value, onChange }) => (
  <div className="w-full flex gap-2 border border-gray-500 p-2 rounded-lg">
    {icon}
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className='bg-transparent outline-none text-gray-300'
    />
  </div>
);