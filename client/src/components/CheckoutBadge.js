import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Link from "./Link";
import { PurchaseConsumer } from "./PurchaseProvider";

const StyledBadge = withStyles(() => ({
    badge: {
        right: -5,
        top: 2,
        padding: '0 4px',
        color: "white"
    },
}))(Badge);

export default function CheckoutBadge() {

    return (
        <PurchaseConsumer>
            {
                ({items, _}) => (
                    <IconButton style={{color: "white"}} component={Link} href="/order">
                        <StyledBadge
                            badgeContent={Object.values(items).map(item => item.count).reduce((a, b) => a + b, 0)}
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                )
            }
        </PurchaseConsumer>
    )
}