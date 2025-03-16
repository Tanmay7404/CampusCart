import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
	private count = 0;
	private mongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
	};

	constructor() {
		this.connectWithRetry();
	}

	getMongoose() {
		return mongoose;
	}

	connectWithRetry = () => {
		log("Attempting MongoDB connection (will retry if needed)");
		mongoose
			.connect(
				"mongodb+srv://testing:testing123@cluster0.uyo2qbo.mongodb.net/?retryWrites=true&w=majority",
				this.mongooseOptions
			)
			.then(() => {
				log("MongoDB is connected");
			})
			.catch((err) => {
				const retrySeconds = 5;
				log(
					`MongoDB connection unsuccessful (will retry #${++this
						.count} after ${retrySeconds} seconds):`,
					err
				);
				setTimeout(this.connectWithRetry, retrySeconds * 10000);
			});
	};
}
export default new MongooseService();
