import ErrorPage from "@src/pages/Error/ErrorPage"
import FunCounter from "@src/pages/FunCounter"
import { createBrowserRouter } from "react-router-dom"
import LoginLayout from "./LoginLayout"
import GameOfLife from "@src/pages/GameOfLife"
import VideoPlayer from "@src/pages/VideoPlayer"
import MainLayout from "./MainLayout"

// export const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: (
// 			<RequireAuth
// 				renderedElement={<MainLayout />}
// 				roles={["user", "leader", "admin"]}></RequireAuth>
// 		),
// 		errorElement: <ErrorPage />,
// 		children: [
// 			{
// 				errorElement: <ErrorPage />,
// 				children: [
// 					{
// 						index: true,
// 						element: <Dashboard />,
// 					},
// 					{
// 						path: "/dashboard",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<Dashboard />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "uploadflow",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<UploadFlow />}
// 								roles={["leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "joblist",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<JobList />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "jobdetail/jobNoOrder/:jobNoOrder/workType/:workType/QCNGStatus/:QCNGStatus/reworkStatus/:reworkStatus",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<JobDetail />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "jobProcess/engineerFlowId/:engineerFlowId/workType/:workType/department/:department",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<JobProcess />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "jobProcessDetail/productionRecordId/:productionRecordId/workType/:workType/department/:department",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<JobProcessDetail />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "wipout",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<WIPOut />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "demolishForm",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<DemolishForm />}
// 								roles={["user", "leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "productionreport",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<ProductionReport />}
// 								roles={["leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "ngreport",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<NGReport />}
// 								roles={["leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "machinereport",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<MachineReport />}
// 								roles={["leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "wipreport",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<WIPReport />}
// 								roles={["leader", "admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "manageusers",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<ManageUsers />}
// 								roles={["admin"]}></RequireAuth>
// 						),
// 					},
// 					{
// 						path: "managemachines",
// 						element: (
// 							<RequireAuth
// 								renderedElement={<ManageMachines />}
// 								roles={["admin"]}></RequireAuth>
// 						),
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		element: <LoginLayout />,
// 		errorElement: <ErrorPage />,
// 		children: [
// 			{
// 				path: "login",
// 				element: <Login />,
// 			},
// 		],
// 	},
// ])

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <FunCounter />,
					},
					{
						path: "funcounter",
						element: <FunCounter />,
					},
					{
						path: "gameoflife",
						element: <GameOfLife />,
					},
					{
						path: "videoplayer",
						element: <VideoPlayer />,
					},
				],
			},
		],
	},
	// {
	// 	element: <LoginLayout />,
	// 	errorElement: <ErrorPage />,
	// 	children: [
	// 		{
	// 			path: "login",
	// 			element: <Login />,
	// 		},
	// 	],
	// },
])
