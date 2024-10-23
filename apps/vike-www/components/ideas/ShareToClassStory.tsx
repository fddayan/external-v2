import React from "react";
import Button from "@src/components/Button";
import { Box } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";

const MenuContainer = styled.div`
  position: absolute;
  left: 100%;
  top: 100%;
  transform: translate(-100%, 0%);
  padding: 7px 0 0;
  z-index: 110;
  text-align: right;
`;

const MenuInnerContainer = styled.div`
  max-width: 250px;
  display: inline-block;
  position: relative;
`;

const Menu = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px 0;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  text-align: left;
  color: rgb(54, 54, 54);
  font-size: 16px;
  padding: 0;
  cursor: default;
`;

const MenuUl = styled.ul`
  overflow: hidden auto;
  text-overflow: ellipsis;
  line-height: normal;
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 6px;
  max-height: 220px;
  min-width: 250px;
`;

const MenuItem = styled.li`
  color: black;
  padding: 0 30px 0 10px;
  border-bottom: 1px solid rgb(218, 218, 218);
  outline: none;
  font-size: 16px;
  height: 40px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;

  :hover {
    background-color: rgb(245, 245, 245);
  }
`;

const ShareStatus = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px 0;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  text-align: center;
  color: rgb(54, 54, 54);
  font-size: 16px;
  padding: 20px;

  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class ShareToClassStory extends React.Component<
  {
    classes: { name: string; _id: string }[];
    body: string;
    image: string | null;
    activityId?: string;
    shareStatus: Record<string, "pending" | "done" | "error">;
  },
  { sharingTo: { name: string; key: string } | null; actMenuOpen: boolean; menuOpen: boolean }
> {
  state = {
    sharingTo: null,
    menuOpen: false,
    actMenuOpen: false,
  };

  render() {
    if (!this.props.classes || !this.props.body) {
      return null;
    }
    const isActivity = typeof this.props.activityId == "string";

    return (
      <div>
        {this._confirmationPopover(this.state.sharingTo, this.props.shareStatus) || (
          <Box>
            {isActivity ? (
              <>
                <Button onClick={() => this.setState({ actMenuOpen: !this.state.actMenuOpen })}>
                  <Translate path="ideas.share_activity" />
                </Button>
                {this.state.actMenuOpen && (
                  <MenuContainer>
                    <MenuInnerContainer>
                      <Menu>
                        <MenuUl>{this._actMenuItems(this.props as any)}</MenuUl>
                      </Menu>
                    </MenuInnerContainer>
                  </MenuContainer>
                )}
              </>
            ) : (
              <>
                <Button onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}>
                  <Translate path="ideas.share_classstory" />
                </Button>
                {this.state.menuOpen && (
                  <MenuContainer>
                    <MenuInnerContainer>
                      <Menu>
                        <MenuUl>{this._menuItems(this.props as any)}</MenuUl>
                      </Menu>
                    </MenuInnerContainer>
                  </MenuContainer>
                )}
              </>
            )}
          </Box>
        )}
      </div>
    );
  }

  _confirmationPopover(
    sharingTo: { key: string; name: string } | null,
    shareStatusMap: Record<string, "pending" | "done" | "error">,
  ) {
    if (!sharingTo || !shareStatusMap) {
      return null;
    }

    const shareStatus = shareStatusMap[sharingTo.key];
    let body = null;

    if (shareStatus === "pending") {
      body = (
        <>
          <Translate path="ideas.sharing_to" subs={{ classname: sharingTo.name }} />
          ...
        </>
      );
    }

    if (shareStatus === "done") {
      body = (
        <>
          <div>
            <Translate path="ideas.shared_to" subs={{ classname: sharingTo.name }} />!
          </div>
          <Button onClick={() => this.setState({ sharingTo: null })}>OK</Button>
        </>
      );
    }

    if (shareStatus === "error") {
      body = (
        <>
          <div>
            <Translate path="ideas.error_sharing" subs={{ classname: sharingTo.name }} />!
          </div>
          <Button onClick={() => this.setState({ sharingTo: null })}>OK</Button>
        </>
      );
    }

    return <ShareStatus>{body}</ShareStatus>;
  }

  _menuItems({ classes, onShare }: { onShare: () => void; classes: { name: string; _id: string }[] }) {
    return classes.map((aclass, i) => {
      return (
        <MenuItem
          key={i}
          onClick={(e) => {
            e.preventDefault();
            this.setState({ menuOpen: !this.state.menuOpen });
            this._onClickClass(onShare, aclass);
          }}
        >
          {aclass.name}
        </MenuItem>
      );
    });
  }

  _actMenuItems({ classes, activityId }: { classes: { _id: string; name: string }[]; activityId: string }) {
    return classes.map((aclass, i) => {
      return (
        <MenuItem key={i}>
          <a href={`https://teach.classdojo.com/classes/${aclass._id}/portfolio?selectedActivityIdeaId=${activityId}`}>
            {aclass.name}
          </a>
        </MenuItem>
      );
    });
  }

  _onClickClass(onShare: (id: string, body: string, image: string) => void, aclass: { _id: string; name: string }) {
    this.setState({
      sharingTo: {
        name: aclass.name,
        key: aclass._id,
      },
    });

    if (typeof onShare === "function") {
      onShare(aclass._id, this.props.body, this.props.image ?? "");
    }
  }
}

export default ShareToClassStory;
