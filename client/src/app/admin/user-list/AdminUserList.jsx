import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { changeUserStatus, fetchUserList } from "../../../api/apiCall";
import { Button } from "../../../components/ui/button";
import { errorMsg, successMsg } from "../../../helpers/notificationMsg";
import PageTitle from "../../../layout/PageTitle";

export default function AdminUserList() {
	const [userList, setUserList] = useState([])

	const fetchData = async () => {
		const res = await fetchUserList()
		setUserList(res?.list || [])
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	const handleUpdate = async (id) => {
		if(!id) return

		const res = await changeUserStatus(id)

		if(res.flag === 'SUCCESS'){
			successMsg(res.msg)
			fetchData()
		} else {
			errorMsg(res.msg)
		}
	}

    return (
        <div className="p-3 md:p-0">
            <PageTitle>Admin User List</PageTitle>

			<Card className="w-full md:w-1/3 shadow-lg mx-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='text-center'>Sl</TableHead>
							<TableHead className='text-center'>Username</TableHead>
							<TableHead className='text-center'>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{userList.map((each, index) => (
							<TableRow key={each.id}>
								<TableCell className='text-center'>{ index + 1 }</TableCell>
								<TableCell className='text-center'>{ each.username }</TableCell>
								<TableCell className='text-center'>
									{each.status
									?
									<Button 
										size='sm' 
										className='bg-red-600 hover:bg-red-700'
										onClick={() => handleUpdate(each.id)}
									>
										Deactivate
									</Button>
									:
									<Button 
										size='sm' 
										className='bg-green-600 hover:bg-green-700'
										onClick={() => handleUpdate(each.id)}
									>
										Activate
									</Button>
									}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
        </div>
    );
}
