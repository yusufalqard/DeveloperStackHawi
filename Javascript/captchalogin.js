var NgbCaptchaLogin = new function __NgbCaptchaLogin()
{
	var _isLoginProcessing = false;
	
	var _header;
	var _hashKey;
	var __0XB8TM2A5RVVQ9IF;
	var __GQ9YYAXNPBGX6MM7;
    var __8M5UMKORARAANPEA;
    var _codeRegSite;
    var _strRedirect;

    var _isLogin2;
    var _callBackMethod;

	var _hashtimer;
	
	var _isInvalidPasswordHashKeyString = false;
    var _isFailover = false;
    var _isSLogin = '0';
	
    this.SetData = function (_0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, _8M5UMKORARAANPEA, strRedirect, codeRegSite, isSLogin )
	{
		__0XB8TM2A5RVVQ9IF = _0XB8TM2A5RVVQ9IF;
		__GQ9YYAXNPBGX6MM7 = _GQ9YYAXNPBGX6MM7;
		__8M5UMKORARAANPEA = _8M5UMKORARAANPEA;
		_strRedirect = strRedirect;
        _codeRegSite = codeRegSite;
        _isSLogin = isSLogin;
	}
	
	this.InitLoginProcessing = function()
	{
		_isLoginProcessing = false;
	}
	
	this.SubmitLogin = function()
	{
		var strDomain = NgbCaptchaLogin.GetLoginURL();
		var strEncData = arguments [ 1 ][ 0 ];
		var strEncCaptchaToken = arguments [ 1 ][ 1 ];
		var strRedirect = arguments[ 1 ][ 2 ];
		var codeRegSite = arguments [ 1 ][ 3 ];
		var isLogin2 = arguments [ 1 ][ 4 ];
        var strCallBackMethod = arguments[1][5];
        var isSLogin = arguments[1][6];
		
		if ( strEncData == 'Error' )
		{
			alert( "로그인 처리과정 중 오류가 발생하였습니다." );
			return false;
		}
		
		if ( _isLoginProcessing )
		{
			alert( "로그인 하는 중입니다. 잠시만 기다려주세요." );
			return false;
		}
		_isLoginProcessing = true;
		
		if( isLogin2 == false )
		{
		    NgbClientForm.AddChildForSubform( 'strEncData', strEncData );
		    NgbClientForm.AddChildForSubform( 'codeRegSite', codeRegSite );
		    NgbClientForm.AddChildForSubform( 'strEncCaptchaToken', strEncCaptchaToken );
            
            if ( typeof( strRedirect ) != 'undefined' )
				NgbClientForm.AddChildForSubform( 'strRedirect', strRedirect );
            else
                NgbClientForm.AddChildForSubform( 'strRedirect', escape( document.location.href ) );
            
            NgbClientForm.AddChildForSubform( 'isCaptchaLogin', "1" );
            NgbClientForm.AddChildForSubform( 'isSLogin', isSLogin );
			
		    NgbClientForm.SubmitForm( 'https://' + strDomain + '/login/page/loginproc.aspx' );
		}
		else
		{
		    var iframe;
			
		    try
		    {
		        iframe = document.createElement( "<iframe name='iframe1' />" );
		    } catch ( ex ) {
		        iframe = document.createElement( "iframe" );
		        iframe.name = "iframe1";
		    }
			
		    iframe.src = "javascript:'<script>window.onload=function(){document.write(\\'<script>document.domain=\\\"nexon.com\\\";<\\\\/script>\\');document.close();};<\/script>'";
		    iframe.style.display = "none";
		    document.body.appendChild( iframe ); 

		    var encData = document.createElement( "input" );
		    encData.setAttribute( "type", "hidden" );
		    encData.setAttribute( "name", "strEncData" );
		    encData.setAttribute( "value", strEncData );

		    var codeRegSite = document.createElement( "input" );
		    codeRegSite.setAttribute( "type", "hidden" );
		    codeRegSite.setAttribute( "name", "codeRegSite" );
		    codeRegSite.setAttribute( "value", codeRegSite );

		    var encCaptchaToken = document.createElement( "input" );
		    encCaptchaToken.setAttribute( "type", "hidden" );
		    encCaptchaToken.setAttribute( "name", "strEncCaptchaToken" );
		    encCaptchaToken.setAttribute( "value", strEncCaptchaToken );

		    var redirect = document.createElement( "input" );
		    redirect.setAttribute( "type", "hidden" );
		    redirect.setAttribute( "name", "strRedirect" );
		    redirect.setAttribute( "value", strRedirect );

		    var callBackMethod = document.createElement( "input" );
		    callBackMethod.setAttribute( "type", "hidden" );
		    callBackMethod.setAttribute( "name", "strCallBackMethod" );
		    callBackMethod.setAttribute( "value", strCallBackMethod );

		    var captchaLogin = document.createElement( "input" );
		    captchaLogin.setAttribute( "type", "hidden" );
		    captchaLogin.setAttribute( "name", "isCaptchaLogin" );
		    captchaLogin.setAttribute( "value", "1" );

		    var form = document.createElement( "form" );
		    form.method = "post";
		    form.target = "iframe1";
		    form.action = "https://" + strDomain + "/login/loginproc2";
		    form.appendChild( encData );
		    form.appendChild( codeRegSite );
		    form.appendChild( encCaptchaToken );
		    form.appendChild( redirect );
		    form.appendChild( captchaLogin );
		    form.appendChild( callBackMethod );

		    document.body.appendChild( form );
			
		    NgbLogin.PollSubmit( form );
		}
	}
	
	this.PollSubmit = function( form )
	{
		try
		{
			form.submit();
		}
		catch( e )
		{
			setTimeout(function() { // set a timeout to give browsers a chance to recognize the <iframe> 
			    NgbCaptchaLogin.PollSubmit( form );
			}, 100 );
		}
	}

    this.SLogin = function (_0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, strRedirect, _8M5UMKORARAANPEA, codeRegSite) {
        NgbCaptchaLogin.SetData(_0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, _8M5UMKORARAANPEA, strRedirect, codeRegSite, '1');

        _isLogin2 = false;
        if (_0XB8TM2A5RVVQ9IF.indexOf('@') != -1 )
        {
            var arrEmail = _0XB8TM2A5RVVQ9IF.split('@');

            if (arrEmail.length != 2 || arrEmail[0] == '' || arrEmail[1] == '' || _0XB8TM2A5RVVQ9IF.indexOf(' ') != -1 )
            {
                alert('아이디를 확인해 주세요.');
                return;
            }

            if (typeof (_hashtimer) != 'undefined') {
                alert('로그인 하는 중입니다. 잠시만 기다려주세요.');
                return;
            }

            _isFailover = false;
            _UFCEIUQVC06W6DTA = _0XB8TM2A5RVVQ9IF;
            AuthSystem.GetPasswordHashKey(_0XB8TM2A5RVVQ9IF, NgbCaptchaLogin.HashHandler);

            _hashtimer = setTimeout('NgbCaptchaLogin.ExpireHashProcess()', 5000);
        }
		else
        {
            NgbCaptchaLogin.MemberLogin();
        }
	}

	this.Login = function( _0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, strRedirect, _8M5UMKORARAANPEA, codeRegSite )
	{
	    NgbCaptchaLogin.SetData( _0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, _8M5UMKORARAANPEA, strRedirect, codeRegSite );

	    _isLogin2 = false;
		if ( _0XB8TM2A5RVVQ9IF.indexOf( '@' ) != -1 )
		{
			var arrEmail = _0XB8TM2A5RVVQ9IF.split( '@' );
			
			if ( arrEmail.length != 2 || arrEmail[ 0 ] == '' || arrEmail[ 1 ] == '' || _0XB8TM2A5RVVQ9IF.indexOf( ' ' ) != -1 )
			{
				alert( '아이디를 확인해 주세요.' );
				return;
			}
			
			if ( typeof( _hashtimer ) != 'undefined' )
			{
				alert( '로그인 하는 중입니다. 잠시만 기다려주세요.' );
				return;
			}
			
			_isFailover = false;
			_UFCEIUQVC06W6DTA = _0XB8TM2A5RVVQ9IF;
			AuthSystem.GetPasswordHashKey( _0XB8TM2A5RVVQ9IF, NgbCaptchaLogin.HashHandler );
			
			_hashtimer = setTimeout( 'NgbCaptchaLogin.ExpireHashProcess()', 5000 );
		}
		else
		{
			NgbCaptchaLogin.MemberLogin();
		}
	}

	this.Login2 = function( _0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, _8M5UMKORARAANPEA, strRedirect, callBackMethod )
    {
	    if( typeof( callBackMethod ) == "undefined" || callBackMethod == "" )
	    {
	        alert( "로그인 처리과정 중 오류가 발생하였습니다." );
	        return;
	    }

	    NgbCaptchaLogin.SetData( _0XB8TM2A5RVVQ9IF, _GQ9YYAXNPBGX6MM7, _8M5UMKORARAANPEA, strRedirect, 0 );
	    _isLogin2 = true;
	    _callBackMethod = callBackMethod;

	    if ( _0XB8TM2A5RVVQ9IF.indexOf( '@' ) != -1 )
	        {
	            var arrEmail = _0XB8TM2A5RVVQ9IF.split( '@' );
			
	            if ( arrEmail.length != 2 || arrEmail[ 0 ] == '' || arrEmail[ 1 ] == '' )
	            {
	                alert( '아이디를 확인해 주세요.' );
	                return;
	            }
			
	            if ( typeof( _hashtimer ) != 'undefined' )
	            {
	                alert( '로그인 하는 중입니다. 잠시만 기다려주세요.' );
	                return;
	            }
			
	            _isFailover = false;
	            _UFCEIUQVC06W6DTA = _0XB8TM2A5RVVQ9IF;

	            AuthSystem.GetPasswordHashKey( _0XB8TM2A5RVVQ9IF, NgbLogin.HashHandler );
	            _hashtimer = setTimeout( 'NgbLogin.ExpireHashProcess()', 5000 );
	        }
        else
        {
	        NgbLogin.MemberLogin();
        }
	}
	
	this.ExpireHashProcess = function()
	{
		clearTimeout( _hashtimer );
		_hashtimer = undefined;
		
		alert( '요청 시간이 초과되었습니다.' );
	}

	this.MemberLogin = function()
	{
		_0XB8TM2A5RVVQ9IF = __0XB8TM2A5RVVQ9IF;
		_GQ9YYAXNPBGX6MM7 = __GQ9YYAXNPBGX6MM7;
        _8M5UMKORARAANPEA = __8M5UMKORARAANPEA;

        codeRegSite = _codeRegSite;
        strRedirect = _strRedirect;
        isSLogin    = _isSLogin;

		var strDomain = NgbCaptchaLogin.GetLoginURL();
		_0XB8TM2A5RVVQ9IF = NgbString.Trim( _0XB8TM2A5RVVQ9IF );
		_GQ9YYAXNPBGX6MM7 = NgbString.Trim( _GQ9YYAXNPBGX6MM7 );
		_8M5UMKORARAANPEA = NgbString.Trim( _8M5UMKORARAANPEA );

		if ( typeof( codeRegSite ) == 'undefined' )
			codeRegSite = 0;
			
		if ( typeof( isPhone ) == 'undefined' )
			isPhone = false;

        if (typeof (isSLogin) == 'undefined')
            isSLogin = '0';

		if ( _0XB8TM2A5RVVQ9IF == '' || _0XB8TM2A5RVVQ9IF.indexOf( ' ' ) != -1 )
		{
			alert( '아이디를 입력해 주세요.' );
			return;
		}
		else if ( _GQ9YYAXNPBGX6MM7 == '' )
		{
			alert( '비밀번호를 입력해 주세요.' );
			return;
		}
        else if( _8M5UMKORARAANPEA = '' ) {
            alert( '자동입력방지문자를 입력해 주세요.' );
            return;
        }
		
        _codeRegSite = codeRegSite;
        _isSLogin = isSLogin;
		
		
		try
		{
			NgbSecurity.InitData();
			
			NgbSecurity.AddData( _0XB8TM2A5RVVQ9IF );
			NgbSecurity.AddData( _0XB8TM2A5RVVQ9IF.indexOf( '@' ) != -1 ? NgbSecurity.HashString2( _header, _GQ9YYAXNPBGX6MM7, _hashKey ) : _GQ9YYAXNPBGX6MM7 );
			
			NgbSecurity.SetURL( 'https://' + strDomain + '/login/page/encryptinfo.aspx', '로그인 하는 중입니다. 잠시만 기다려주세요.' );
			NgbSecurity.Encrypt( NgbCaptchaLogin.EncryptHandler );
		}
		catch( e )
		{
            NgbEVM.AddCommand(NgbEVM.k_nEventType_onPageEnd, new NgbEVMDelegator(NgbCaptchaLogin.SubmitLogin), '', '', strRedirect, _codeRegSite, _isLogin2, _callBackMethod, _isSLogin );
		}
	}
	
	this.EncryptHandler = function( encData )
	{
        NgbEVM.AddCommand(NgbEVM.k_nEventType_onPageEnd, new NgbEVMDelegator(NgbCaptchaLogin.SubmitLogin), encData, __8M5UMKORARAANPEA, strRedirect, _codeRegSite, _isLogin2, _callBackMethod, _isSLogin );
	}

	this.Logout = function( strURL )
	{
		var strDomain = NgbCaptchaLogin.GetLoginURL();
	
		if ( typeof( strURL ) == 'undefined' )
			strURL = document.location.href;
		
		document.location.href = 'http://' + strDomain + '/login/page/logout.aspx?redirect=' + escape( strURL );
	}
	
	this.GetLoginURL = function()
	{
		var strDomain;
		
		try
		{
			strDomain = NgbUrl.GetDomainURL();
		}
		catch ( e )
		{
			strDomain = 'login.nexon.com';
		}
		
		switch ( strDomain )
		{
			case 'df.nexon.com' : 
			case 'dflogin.nexon.com' : 
				return 'dflogin.nexon.com';
				
			default : 
				return 'login.nexon.com';
		}
	}
	
	this.HashHandler = function( resultObject, responseXML )
	{
		try
		{
			clearTimeout( _hashtimer );
			_hashtimer = undefined;
		
			if ( typeof( resultObject.PasswordHashKeyString ) != 'undefined' && resultObject.PasswordHashKeyString != '' )
			{
				var result = resultObject.PasswordHashKeyString;
				var info = result.split(':');
				_header = info[0] + ':' + info[1] + ':' + info[2] + ':';
				_hashKey = info[3];
				
				_isInvalidPasswordHashKeyString = false;
			}
			else
			{
				_isInvalidPasswordHashKeyString = true;
			}
		}
		catch ( e )
		{
			_isInvalidPasswordHashKeyString = true;
		}
		
		if ( _isInvalidPasswordHashKeyString == true )
		{
			alert( "로그인 처리과정 중 오류가 발생하였습니다." );
			return;
		}
		else
		{
			NgbCaptchaLogin.MemberLogin();
		}
	}
}
