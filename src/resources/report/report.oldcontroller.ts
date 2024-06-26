// import { NextFunction, Request, Response } from "express";
// import { Document, Types } from "mongoose";
// import { BadRequestError, NotFoundError } from "../../core/ApiError";
// import { SuccessResponse } from "../../core/ApiResponse";
// import { handleErrorResponse } from "../../helpers/errorHandle";
// import { NotificationContentType } from "../../types/notification";
// import { PointType } from "../../types/points";
// import { History } from "../history/history.model";
// import { NotificationService } from "../notification/notification.service";
// import { UserService } from "../user/user.service";
// import { IReport, Report } from "./report.model";


// export async function getReports(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     const reporter_id = res.locals.user._id;

//     let { type, country, categories } = req.query;
//     const start_year = req.query.start_year as string;
//     const end_year = req.query.end_year as string;
//     let int_start_year: number | undefined;
//     let int_end_year: number | undefined;

//     if (type === undefined || typeof type !== "string" || !(type in ReportType)) {
//         return res.status(400).json({ message: "You need to specify a valid type" });
//     }

//     if (Number.isNaN(parseInt(start_year))) {
//         int_start_year = undefined;
//     } else {
//         int_start_year = parseInt(start_year);
//     }

//     if (Number.isNaN(parseInt(end_year))) {
//         int_end_year = undefined;
//     } else {
//         int_end_year = parseInt(end_year);
//     }


//     try {
//         let reports: Omit<Document<unknown, {}, IReport> & IReport & { _id: Types.ObjectId; }, never>[];
//         switch (type) {
//             case ReportType.History:
//                 reports = await getHistoryReports({ reporter_id, start_year: int_start_year, end_year: int_end_year, country, categories });
//                 return res.status(200).json(reports);
//             default:
//                 res.status(400).json({ message: "Invalid Type specified" })
//         }

//         return res.status(500).json({ message: "Server Error" });
//     } catch (error) {
//         console.error("error is: ", error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// }



// export async function createReports(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const reporter_id = res.locals.user._id;

//         let {
//             content_id,
//             title,
//             type,
//             reason
//         } = req.body

//         switch (type) {
//             case ReportType.history:
//                 const history = await History.find({ _id: content_id });
//                 if (!history)
//                     throw new NotFoundError("There is no history with the specified id");
//             case ReportType.map:
//                 console.log("Report for map invoked")
//                 throw new NotFoundError(`Report for type: ${ReportType.map} is not currently supported`)
//         }


//         const report = new Report({ reporter_id, content_id, type, reason });

//         await report.save();

//         const populateTask = report.populate("content_id");


//         const message = `${PointType.report} points have been added to your account for reporting a ${type} report`;
//         const notification = NotificationService.createNotification(reporter_id, message, NotificationContentType.report, report._id.toString());
//         const points = UserService.addPoints(reporter_id, PointType.report);


//         const [populatedReport, _, __] = await Promise.all([populateTask, notification, points]);


//         const data = {
//             report: populatedReport
//         }


//         return new SuccessResponse("Report created successfully", data).send(res);
//     } catch (error) {
//         console.error("error is: ", error);
//         handleErrorResponse(error, res);
//     }


// }



// export async function getReport(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     try {
//         const report = await Report.findById(req.params.id).populate("content_id");

//         if (!report)
//             return res.status(400).json({ message: "There is no report with the specified id" });

//         // Respond
//         res.status(200).json(report);
//     } catch (error) {
//         console.error("error is: ", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// }

// export async function updateReport(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     let {
//         reason
//     } = req.body

//     try {
//         const reporter_id = res.locals.user._id;
//         const report = await Report.findById(req.params.id);

//         if (!report)
//             return res.status(400).json({ message: "There is no report with the specified id" });

//         if (report.reporter_id === undefined || report.reporter_id.toString() !== reporter_id.toString()) {
//             return res.status(400).json({ message: "You are not authorized to update this report" });
//         }

//         if (report.status !== ReportStatus.Open) {
//             return res.status(400).json({ message: `This report is already  ${report.status} and can not be updated` });
//         }

//         const updatedReport = await Report.findByIdAndUpdate(req.params.id, { reason }, { new: true }).populate("content_id");

//         // Respond
//         res.status(200).json(updatedReport);
//     } catch (error) {
//         console.error("error is: ", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// }


// export async function deleteReport(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     let {
//         reason
//     } = req.body

//     try {
//         const reporter_id = res.locals.user._id;
//         const report = await Report.findById(req.params.id);

//         if (!report)
//             return res.status(400).json({ message: "There is no report with the specified id" });

//         if (report.reporter_id === undefined || report.reporter_id.toString() !== reporter_id.toString()) {
//             return res.status(400).json({ message: "You are not authorized to delete this report" });
//         }

//         if (report.status !== ReportStatus.Open) {
//             return res.status(400).json({ message: `This report is already  ${report.status} and can not be deleted` });
//         }

//         const deletedReport = await Report.findByIdAndDelete(req.params.id);

//         // Respond
//         res.status(200).json({ message: "Report deleted successfully" });
//     } catch (error) {
//         console.error("error is: ", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// }