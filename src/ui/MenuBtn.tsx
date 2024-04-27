type MenuBtnProps = {
  openMenu: () => void;
};

function MenuBtn({ openMenu }: MenuBtnProps) {
  return (
    <button className="back-btn" onClick={() => openMenu()}>
      <img src="../../assets/images/icon-menu.svg" alt="" />
    </button>
  );
}
export default MenuBtn;
