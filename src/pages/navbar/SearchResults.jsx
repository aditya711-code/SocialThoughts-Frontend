import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import { CloseTwoTone } from "@mui/icons-material";
import { useState, useEffect } from "react";
const SearchResults = ({ users }) => {
    console.log("search results", users)
    const { palette } = useTheme();
    const navigate = useNavigate()
    const dark = palette.neutral.dark;
    const [disp, setDisplay] = useState('none')
    useEffect(() => {
        if (disp == 'none' && users.length > 0) {
            setDisplay('block')
        }
    }, [users])
    console.log("users", disp)
    return (
        <WidgetWrapper style={{ marginLeft: '21.5rem', position: 'absolute', backgroundColor: palette.background.alt, zIndex: 1, display: disp }}>
            {users && users.map((user) => {
                return <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }} key={user._id} >
                    < FlexBetween gap="1rem" flexDirection='row'>
                        <UserImage image={user.picturePath} />
                        <Box>
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.main,
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={() => navigate(`/profile/${user._id}`)}
                            >
                                {user.firstName} {user.lastName}
                            </Typography>

                        </Box>
                    </FlexBetween >
                </div>
            })}
            <Button onClick={() => disp == 'block' ? setDisplay('none') : setDisplay('block')}>
                <CloseTwoTone />
            </Button>
        </WidgetWrapper>
    )
}
export default SearchResults;