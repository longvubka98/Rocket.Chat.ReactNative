import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import Sort from './Sort';
import Encryption from './Encryption';

import OmnichannelStatus from '../../../ee/omnichannel/containers/OmnichannelStatus';

const ListHeader = React.memo(({
	searching,
	sortBy,
	onChangeSearchText,
	onCancelSearchPress,
	onSearchFocus,
	inputRef,
	toggleSort,
	goEncryption,
	goQueue,
	queueSize,
	inquiryEnabled,
	encryptionBanner,
	user
}) => (
	<>
		<SearchBar
			inputRef={inputRef}
			searching={searching}
			onChangeSearchText={onChangeSearchText}
			onCancelSearchPress={onCancelSearchPress}
			onSearchFocus={onSearchFocus}
		/>
		{/* <Encryption searching={searching} goEncryption={goEncryption} encryptionBanner={encryptionBanner} /> */}
		<Sort searching={searching} sortBy={sortBy} toggleSort={toggleSort} />
		{/* <OmnichannelStatus searching={searching} goQueue={goQueue} inquiryEnabled={inquiryEnabled} queueSize={queueSize} user={user} /> */}
	</>
));

ListHeader.propTypes = {
	searching: PropTypes.bool,
	sortBy: PropTypes.string,
	toggleSort: PropTypes.func,
	goEncryption: PropTypes.func,
	goQueue: PropTypes.func,
	queueSize: PropTypes.number,
	inquiryEnabled: PropTypes.bool,
	encryptionBanner: PropTypes.string,
	user: PropTypes.object
};

export default ListHeader;
