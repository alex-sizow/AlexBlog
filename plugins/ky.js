import ky from 'ky';

export default function (ctx, inject) {
	inject('ky', ky);
}
