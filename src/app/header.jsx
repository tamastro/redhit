const Header = () => {
	return (
		<>
			<h1>REDHIT HEADER</h1>
			<input placeholder={'search'} />

			<div className='w-half bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<ul
					className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'
					id='defaultTab'
					data-tabs-toggle='#defaultTabContent'
					role='tablist'
				>
					<li className='me-2'>
						<button
							id='about-tab'
							data-tabs-target='#about'
							type='button'
							role='tab'
							aria-controls='about'
							aria-selected='true'
							className='inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500'
						>
							HOT
						</button>
					</li>
					<li className='me-2'>
						<button
							id='services-tab'
							data-tabs-target='#services'
							type='button'
							role='tab'
							aria-controls='services'
							aria-selected='false'
							className='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
						>
							TOP
						</button>
					</li>
					<li className='me-2'>
						<button
							id='statistics-tab'
							data-tabs-target='#statistics'
							type='button'
							role='tab'
							aria-controls='statistics'
							aria-selected='false'
							className='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
						>
							NEW
						</button>
					</li>
				</ul>
				<select
					name={'viewFilter'}
					id={'viewFilter'}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				>
					<option value='card'>Card</option>
					<option value='classic'>Classic</option>
					<option value='compact'>compact</option>
				</select>
			</div>
		</>
	);
};

export default Header;
