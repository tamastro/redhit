const Header = () => {
	return (
		<>
			<h1>REDHIT HEADER</h1>
			<input placeholder={'search'} />
			<label
				for='Filter'
				class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				Sort
			</label>

			<select
				name={'filter'}
				id={'threadFilter'}
				class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
			>
				<option value='hot'>HOT</option>
				<option value='top'>TOP</option>
				<option value='new'>NEW</option>
			</select>
			<label
				for='countries'
				class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				Select an option
			</label>

			<select
				name={'viewFilter'}
				id={'viewFilter'}
				class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
			>
				<option value='card'>Card</option>
				<option value='classic'>Classic</option>
				<option value='compact'>compact</option>
			</select>
		</>
	);
};

export default Header;
