import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// **********register*************//

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    messageAlert,
    phoneNumber,
    termAndCondition,
  } = req.body;

  console.log(req.body);

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    res.status(201).json(new ApiResponse(400,[] , "All fields are required"));
    // throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    res
      .status(201)
      .json(new ApiResponse(409,[], "User with email already exists"));
    // throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    messageAlert,
    termAndCondition,
  });

  const createdUser = await User.findById(user._id).select("-password ");

  console.log(createdUser);

  if (!createdUser) {
    res
      .status(201)
      .json(
        new ApiResponse(500,[], "Something went wrong while registering the user")
      );
    // throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});


// ************login**************//

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if ([email, password].some((field) => field?.trim() === "")) {
    res.status(201).json(new ApiResponse(400,[], "All fields are required"));
    // throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(user);
  if (!user) {
    res.status(201).json(new ApiResponse(401,[], "Invalid email or password"));
    // throw new ApiError( 401,"Invalid email or password");
  }

  const isPasswordMatched = await user.isPasswordCorrect(password);

  if (!isPasswordMatched) {
    res.status(201).json(new ApiResponse(401,[], "Invalid password "));
    // throw new ApiError(401, "Invalid password ");
  }

  const userdata = await User.findOne({ email }).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(200, userdata, "Login Successfull"));
});

export { registerUser, loginUser };
